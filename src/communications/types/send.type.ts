import { Channel, Language, MessageModel as Model } from "../enum";

export interface SendMessage {
  cmd: string;
  channel: Channel;
  model: Model;
  language: Language;
  context: string;
}
