import User from '../Models/user.model.js';
import redisClient from '../../../redis.js';

const LoginController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Authorization header missing',
      });
    }

    const token = authHeader.split(' ')[1];

    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return res.status(401).json({
        message: 'Invalid Google access token',
      });
    }

    const userInfo = await response.json();

    const user = await User.findOne({
      googleId: userInfo.sub,
    });

    if (!user) {
      // Create user in MongoDB
      const newUser = await User.create({
        googleId: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
      });

      // Store user in Redis
      await redisClient.set(
        `user:${userInfo.sub}`,
        JSON.stringify({
          userId: newUser._id.toString(),
          googleId: newUser.googleId,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        }),
        {
          EX: 3600,
        }
      );

      return res.status(201).json({
        message: 'User Created Successfully',
        user: newUser,
      });
    }

    const userData = await redisClient.get(`user:${userInfo.sub}`);
    if (!userData) {
      await redisClient.set(
        `user:${userInfo.sub}`,
        JSON.stringify({
          userId: user._id.toString(),
          googleId: user.googleId,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }),
        {
          EX: 3600,
        }
      );
    }
    return res.status(200).json({
      message: 'User Logged In Successfully',
      user,
    });
  } catch (error) {
    console.error('Login Error:', error);

    return res.status(500).json({
      message: 'Internal Server Error From LoginController',
      error: error.message,
    });
  }
};

export default LoginController;
