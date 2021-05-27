export class BankDetails {
    public Title: number;
    public FirstName: string;
    public LastName: string;
    public MaritalStatus: number;
    public Email: string;
    public UserId: string;
    //public Password: string;
    public ContactAddress: string;
    public City: string;
    public State: number;
    public Pincode: number;
    public Occupation: string;
    public EmploymentType: number;
    public TypeofAccount: string;
    public AccountNumber: string;
    //public Txntype: string;
    public Mobileno: number;
    public Status: string;
}

export class BankDet {
    public Title: number;
    public FirstName: string;
    public LastName: string;
    public MaritalStatus: number;
    public Email: string;
    public UserId: string;
    //public Password: string;
    public ContactAddress: string;
    public City: string;
    public State: number;
    public Pincode: number;
    public Occupation: string;
    public EmploymentType: number;
    public TypeofAccount: number;
    public AccountNumber: string;
    //public Txntype: string;
    public Mobileno: number;
    public Status: string;
    public id: string;
}

export class SubVariables {
    IsAdmin: boolean;
    IsUser: boolean;
    IsDefault: boolean;
}

export class AddMoney {
    public AccountNumber: string;
    public Txn_Amount: number;
    public Txntype: string;
}

export class ToAddMoney {
    public AccountNumber: string;
    public Txn_Amount: number;
    public Txntype: string;
}

export class alldet{
    public AccountNumber: string;
    public CustomerName: string;
    public AccountType: string;
    public Mobileno: number;
    public Balance: number;
    public Status: string;
}