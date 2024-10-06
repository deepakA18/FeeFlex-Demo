import { VersionedTransaction } from "@solana/web3.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {inputMint, outputMint, amount, userPublicKey } = await request.json();

    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid fromAmount value:', amount);
      return NextResponse.error();
    }

    if(!userPublicKey) {
        return NextResponse.error();
    }

    const quote = await (
        await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippage=0.5`)
    ).json()
    
    if(!quote) {
        return NextResponse.error();
    }

    const data = await (
        await fetch("https://quote-api.jup.ag/v6/swap", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteResponse: quote,
                userPublicKey,
                wrapAndUnwrapSol: true
            })
        })
    ).json()
   

    return NextResponse.json({swapTransaction: data.swapTransaction, status: 200});

}