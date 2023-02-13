export const filterFunctions = (
  transaction: any,
  streamerMessage: any,
): any => {
  if (transaction.actions) {
    transaction.actions.map((action, ind) => {
      if (action['FunctionCall'] == undefined) return;
      else if (action['FunctionCall'].methodName == undefined) return;
      else {
        const data = {
          method: action['FunctionCall'].methodName,
          signerId: transaction.signerId,
          receiverId: transaction.receiverId,
          height: streamerMessage.block.header.height,
          timestamp: streamerMessage.block.header.timestamp,
          receiptId:
            transaction.outcome.executionOutcome.outcome.receiptIds[ind],
          //hash: e.chunk.header,
          args: JSON.stringify(
            Buffer.from(action['FunctionCall'].args, 'base64').toString(
              'ascii',
            ),
          ),
        };
        // this.checkFunction(
        //   action['FunctionCall'].methodName,
        //   h.transaction.receiverId,
        // ) &&
        //   this.receiptIds.push(data) &&
        //   this.createStartFunctionEvent(data) &&
        console.log(
          //   // 'shard: ',
          //   // i + ' chunk: ' + ind + ' action: ' + index + ' || ',
          //   // ' signerId:',
          //   // h.transaction.signerId,
          //   // ' receiverId:',
          //   // h.transaction.receiverId,
          //   // ' methodName:',
          //   // action['FunctionCall'].methodName,
          //   //l['FunctionCall'],
          //   //atob(l['FunctionCall'].args),
          //   //h.transaction.actions,
          //h.transaction.signerId,
          //h.transaction.receiverId,
          //streamerMessage.block.header.height,
          'START FUNCTION:',
          transaction.actions,
          //   //this.createEvent(data),
        );
      }
    });
  }
};
