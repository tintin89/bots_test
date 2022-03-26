export interface Bot{
    id:string;
    status: "available" | "busy" | "reserved";
    location:Dropoff;
	zone_id: string;
};

interface Dropoff{    
 dropoff_lat: Number;
 dropoff_lon: Number;
	
}

