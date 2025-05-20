export type RecordDetail = {
  id: number;
  title: string;
  description: string;
  approved: boolean;
  owner_address: string;
  blockchain_tx_hash: string | null;
};
