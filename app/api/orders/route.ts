import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { authenticateToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const token = await authenticateToken(req)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cart, shippingInfo, paymentInfo } = await req.json()

    const { db } = await connectToDatabase()

    const order = {
      userId: new ObjectId(token.userId),
      cart,
      shippingInfo,
      paymentInfo: {
        lastFourDigits: paymentInfo.cardNumber.slice(-4),
        cardholderName: paymentInfo.cardName,
      },
      status: 'pending',
      createdAt: new Date(),
    }

    const result = await db.collection('orders').insertOne(order)

    return NextResponse.json({ success: true, orderId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

