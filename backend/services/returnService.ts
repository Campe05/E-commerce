import { Return } from '../models/Return';

export async function createReturn(userId: string, orderNumber: string, productName: string, reason: string, description: string) {
  const returnRequest = new Return({
    userId,
    orderNumber,
    productName,
    reason,
    description,
    status: 'pending'
  });

  await returnRequest.save();
  return returnRequest;
}

