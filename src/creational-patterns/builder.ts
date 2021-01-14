namespace Builder {

  class BankAccount {
    accountNumber: string;
    owner: string;
    balance: number;
    interestRate: number;
  }

  interface IBankAccountBuilder {
    setAccountNumber(num: number): IBankAccountBuilder;
    setOwner(owner: string): IBankAccountBuilder;
    setBalance(balance: number): IBankAccountBuilder;
    setInterestRate(num: number): IBankAccountBuilder;
    getAccount(): BankAccount;
  }

  class SpanishBankAccountBuilder implements IBankAccountBuilder {
    constructor(private _account: BankAccount = new BankAccount()) { }

    setAccountNumber(num: number): IBankAccountBuilder {
      this._account.accountNumber = `ES ${num}`;
      return this;
    }

    setOwner(owner: string): IBankAccountBuilder {
      this._account.owner = owner;
      return this;
    }

    setBalance(balance: number): IBankAccountBuilder {
      this._account.balance = balance;
      return this;
    }

    setInterestRate(num: number): IBankAccountBuilder {
      this._account.interestRate = num;
      return this;
    }

    getAccount(): BankAccount {
      return this._account;
    }
  }

  class ESBankAccountDirector {
    static build(): BankAccount {
      return new SpanishBankAccountBuilder()
        .setAccountNumber(1234123412341234)
        .setOwner('Antonio Medina')
        .setBalance(2)
        .setInterestRate(0.5)
        .getAccount();
    }
  }
}

