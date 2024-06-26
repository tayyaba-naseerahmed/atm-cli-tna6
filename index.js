#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000000;
let myPin = 1971;
let pinAns = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: "Enter your pin!",
});
if (pinAns.pin === myPin) {
    console.log(chalk.greenBright("correct pin code!"));
    let action = await inquirer.prompt({
        name: "transactionType",
        type: "list",
        message: " Select the transaction you want to continue",
        choices: ["Withdraw", "Fastcash", "Balance Inquiry"]
    });
    if (action.transactionType === "Balance Inquiry") {
        console.log(`Your current balance is: ${myBalance}`);
    }
    else if (action.transactionType === "Withdraw") {
        let WithdrawAmount = await inquirer.prompt({
            name: "Amount",
            type: "number",
            message: " Enter the amount you want to withdraw?"
        });
        if (WithdrawAmount.Amount < myBalance) {
            myBalance -= WithdrawAmount.Amount;
            console.log(chalk.greenBright("Transaction Succesful"));
            console.log(`your remaining balance is: ${myBalance}`);
        }
        else if (WithdrawAmount.Amount > myBalance) {
            console.log(chalk.redBright(`Unable to proceed the transaction due to insufficent balance.\nYour current balance`));
        }
    }
    else if (action.transactionType === "Fastcash") {
        let cashAmount = await inquirer.prompt({
            name: "cash",
            type: "rawlist",
            message: " Select the amount you want to withdraw?",
            choices: ["500", "1000", "2000", "3000", "4000", "5000", "10000"]
        });
        myBalance -= cashAmount.cash;
        console.log(chalk.greenBright("Transaction successfull"));
        console.log(`your remaining balance is : ${myBalance}`);
    }
}
else if (pinAns.pin !== myPin) {
    console.log(chalk.redBright("Incorrect pin code! Please try again later"));
}
