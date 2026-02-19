
export enum AppView {
  SLACK = 'slack',
  JIRA = 'jira',
  VSCODE = 'vscode'
}

export interface Message {
  id: string;
  sender: 'User' | 'Ordino';
  content: string;
  timestamp: Date;
  type?: 'text' | 'alert' | 'log';
}

export interface JiraTicket {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  comments: Message[];
}
