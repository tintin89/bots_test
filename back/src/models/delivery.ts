
export default interface Delivery{
    id:string;
    creation_date:Date;
    state: "pending" | "assigned" | "in_transit" | "delivered";
    pickup : Pickup;
    dropoff: Dropoff;
    zone_id:string;
}

interface Pickup{
    pickup_lat:Number;
    pickup_long:Number;    
}

interface Dropoff{
    dropoff_lat:Number;
    dropoff_long:Number;
}