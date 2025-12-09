
export type Organization = 'RIAJ' | 'FMPJ' | 'JAME' | 'JASRAC' | 'MPA';

export type UserAttribute = 'アーティスト' | '会員社' | 'メディア';

export type VotingStatus = '未送信' | '送信済' | '登録完了';

export interface Voter {
  id: string;
  name: string;
  organization: Organization;
  email: string;
  uniqueVotingId: string;
  attribute: UserAttribute;
  status: VotingStatus;
}

export const MOCK_VOTERS: Voter[] = [
  { id: '1', name: 'Ado', organization: 'RIAJ', email: 'ado@example.com', uniqueVotingId: 'V-8829-X', attribute: 'アーティスト', status: '登録完了' },
  { id: '2', name: 'King Gnu', organization: 'RIAJ', email: 'info@kinggnu.jp', uniqueVotingId: 'V-1102-A', attribute: 'アーティスト', status: '送信済' },
  { id: '3', name: 'Sony Music Labels', organization: 'RIAJ', email: 'contact@sonymusic.co.jp', uniqueVotingId: 'V-3391-B', attribute: '会員社', status: '登録完了' },
  { id: '4', name: 'Universal Music', organization: 'RIAJ', email: '', uniqueVotingId: 'V-4482-C', attribute: '会員社', status: '未送信' },
  { id: '5', name: 'Official Hige Dandism', organization: 'FMPJ', email: 'hige@example.com', uniqueVotingId: 'V-5573-D', attribute: 'アーティスト', status: '送信済' },
  { id: '6', name: 'Vaundy', organization: 'FMPJ', email: '', uniqueVotingId: 'V-6664-E', attribute: 'アーティスト', status: '未送信' },
  { id: '7', name: 'Warner Music', organization: 'RIAJ', email: 'warner@example.com', uniqueVotingId: 'V-7755-F', attribute: '会員社', status: '未送信' },
  { id: '8', name: 'Space Shower TV', organization: 'JAME', email: 'sstv@example.com', uniqueVotingId: 'V-8846-G', attribute: 'メディア', status: '登録完了' },
  { id: '9', name: 'Rockin On', organization: 'JAME', email: '', uniqueVotingId: 'V-9937-H', attribute: 'メディア', status: '未送信' },
  { id: '10', name: 'Avex', organization: 'JASRAC', email: 'avex@example.com', uniqueVotingId: 'V-0028-I', attribute: '会員社', status: '送信済' },
  { id: '11', name: 'Pony Canyon', organization: 'MPA', email: 'pony@example.com', uniqueVotingId: 'V-1119-J', attribute: '会員社', status: '未送信' },
  { id: '12', name: 'Mrs. GREEN APPLE', organization: 'RIAJ', email: 'mga@example.com', uniqueVotingId: 'V-2201-K', attribute: 'アーティスト', status: '登録完了' },
  { id: '13', name: 'YOASOBI', organization: 'RIAJ', email: 'yoasobi@example.com', uniqueVotingId: 'V-3392-L', attribute: 'アーティスト', status: '送信済' },
  { id: '14', name: 'Back Number', organization: 'FMPJ', email: '', uniqueVotingId: 'V-4483-M', attribute: 'アーティスト', status: '未送信' },
  { id: '15', name: 'Tower Records', organization: 'JAME', email: 'tower@example.com', uniqueVotingId: 'V-5574-N', attribute: 'メディア', status: '登録完了' },
];

export const ORGANIZATIONS: Organization[] = ['RIAJ', 'FMPJ', 'JAME', 'JASRAC', 'MPA'];
