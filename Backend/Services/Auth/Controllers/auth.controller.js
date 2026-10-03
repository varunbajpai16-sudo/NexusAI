import User from '../Models/user.model.js';
const LoginController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);
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

    console.log('Google User:', userInfo);
    const user = await User.findOne({
      googleId: userInfo.sub,
    });

    if (!user) {
      const newUser = await User.create({
        googleId: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
      });

      return res.status(201).json({
        message: 'User Created Successfully',
        user: newUser,
      });
    }

    return res.status(200).json({
      message: 'User Logged In Successfully',
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error From LoginController',
      error: error.message,
    });
  }
};

export default LoginController;
