class Plant {
    name: string = "";
    scientific_name: string = "";
    description: string = "";
    median_lifespan: string = "";
    first_harvest_exp: string = "";
    last_harvest_exp: string = "";
    height: number = 0;
    spread: number = 0;
    row_spacing: number = 0;
    sun_requirements: string = "";
    sowing_method: string = "";
    image_url: string = "";
    plant_time: Date = new Date();
}

export default Plant;