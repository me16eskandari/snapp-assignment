import { Passenger } from "src/models";

export const PassengerInfo: React.FC<Passenger> = ({
    balance, banned, cellphone_verified, createdAt, email, first_name, gender,
    last_name, notes, number_masked, phone, updatedAt
}) => {
    const n0 = (x: number) => {
        if (isNaN(x)) return "";

        var n = x.toString().split('.');
        return n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (n.length > 1 ? "." + n[1] : "");
    };

    return (
        <div className="form two-column has-bg">
            <div className="input">
                <label>First Name</label>
                <strong>{first_name}</strong>
            </div>
            <div className="input">
                <label>Last Name</label>
                <strong>{last_name}</strong>
            </div>
            <div className="input">
                <label>Gender</label>
                <strong>{gender}</strong>
            </div>
            <div className="input">
                <label>Email</label>
                <strong>{email}</strong>
            </div>
            <div className="input">
                <label>Phone</label>
                <strong>{phone}</strong>
            </div>
            <div className="input">
                <label>Phone Verified</label>
                <strong>{cellphone_verified ? "True" : "False"}</strong>
            </div>
            <div className="input">
                <label>Number Masked</label>
                <strong>{number_masked}</strong>
            </div>
            <div className="input">
                <label>Banned</label>
                <strong>{banned ? "True" : "False"}</strong>
            </div>
            <div className="input">
                <label>Balance</label>
                <strong>${n0(balance)}</strong>
            </div>
            <div className="input">
                <label>Note</label>
                <strong>{notes}</strong>
            </div>
            <div className="input">
                <label>Create At</label>
                <strong>{new Date(createdAt).toUTCString()}</strong>
            </div>
            <div className="input">
                <label>Update At</label>
                <strong>{new Date(updatedAt).toUTCString()}</strong>
            </div>
        </div>
    )
};