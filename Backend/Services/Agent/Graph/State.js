
import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const NexusState = Annotation.Root({
  ...MessagesAnnotation.spec,

  userMessage: Annotation({
    reducer: (_, update) => update,
    default: () => "",
  }),

  agentResponse: Annotation({
    reducer: (_, update) => update,
    default: () => "",
  }),

  agent: Annotation({
    reducer: (_, update) => update,
    default: () => "Chat",
  }),
});
