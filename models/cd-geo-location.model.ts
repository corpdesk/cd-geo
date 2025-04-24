import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity(
    {
        name: 'cd_geo_location',
        synchronize: false
    }
)
@Unique(['cdGeoLocationName', 'cdGeoLocationCode']) 
export class CdGeoLocationModel {
    @PrimaryGeneratedColumn(
        {
            name: 'cd_geo_location_id'
        }
    )
    cdGeoLocationId?: number;

    @Column({
        name: 'cd_geo_location_guid',
        length: 36,
        default: uuidv4()
    })
    cdGeoLocationGuid?: string;

    @Column(
        {
            name: 'cd_geo_location_name',
            length: 50,
            nullable: true
        }
    )
    cdGeoLocationName: string;

    @Column(
        {
            name: 'cd_geo_location_description',
            length: 60,
            default: null
        })
    cdGeoLocationDescription: string;

    @Column(
        {
            name: 'doc_id',
            default: null
        }
    )
    docId?: number;

    // @Column(
    //     {
    //         name: 'cd_geo_location_type_id',
    //         default: null
    //     }
    // )
    // cdGeoLocationTypeId?: number;

    @Column(
        {
            name: 'lat',
            default: null
        }
    )
    lat?: number;

    @Column(
        {
            name: 'long',
            default: null
        }
    )
    long?: number;

    @Column(
        {
        name: 'cd_geo_boundary_data',
        type: 'json'
    })
    cdGeoBoundaryData?: string;

    @Column({
        name: 'cd_geo_location_code',
        length: 10,
        default: null
    })
    cdGeoLocationCode: string;

    @Column({
        name: 'cd_geo_location_icon',
        type: 'json',
        default: null
    })
    cdGeoLocationIcon?: string;

    @Column({
        name: 'back4app_obectId',
        length: 10,
        default: null
    })
    back4appObectId?: string;

    @Column(
        {
            name: 'cd_geo_political_type_id',
            default: null
        }
    )
    cdGeoPoliticalTypeId?: number;

    @Column(
        {
            name: 'cd_geo_political_parent_id',
            default: null
        }
    )
    cdGeoPoliticalParentId?: number;

    
    @Column(
        {
            name: 'cd_geo_location_name_alt',
            type: 'json',
            default: null
        }
    )
    cdGeoLocationNameAlt?: string;

    //cd_geo_location_assoc
    @Column(
        {
            name: 'cd_geo_location_assoc',
            type: 'json',
            default: null
        }
    )
    cdGeoLocationAssoc?: string;


    @Column(
        {
            name: 'cd_geo_location_population',
            type: 'json',
            default: null
        }
    )
    cdGeoLocationPopulation?: string;

    
    @Column(
        {
            name: 'cd_geo_location_enabled',
            default: null
        }
    )
    cdGeoLocationEnabled?: boolean;

    @Column(
        {
            name: 'cd_geo_location_display',
            default: null
        }
    )
    cdGeoLocationDisplay?: boolean;

}

export const cdGeoPoliticalTypes = [
	{
		"cd_geo_political_type_id" : 1,
		"cd_geo_political_type_name" : "town"
	},
	{
		"cd_geo_political_type_id" : 2,
		"cd_geo_political_type_name" : "city"
	},
	{
		"cd_geo_political_type_id" : 3,
		"cd_geo_political_type_name" : "sub-location"
	},
	{
		"cd_geo_political_type_id" : 4,
		"cd_geo_political_type_name" : "location"
	},
	{
		"cd_geo_political_type_id" : 5,
		"cd_geo_political_type_name" : "county"
	},
	{
		"cd_geo_political_type_id" : 6,
		"cd_geo_political_type_name" : "district"
	},
	{
		"cd_geo_political_type_id" : 7,
		"cd_geo_political_type_name" : "sub-district"
	},
	{
		"cd_geo_political_type_id" : 8,
		"cd_geo_political_type_name" : "province"
	},
	{
		"cd_geo_political_type_id" : 9,
		"cd_geo_political_type_name" : "state"
	},
	{
		"cd_geo_political_type_id" : 10,
		"cd_geo_political_type_name" : "country"
	},
	{
		"cd_geo_political_type_id" : 11,
		"cd_geo_political_type_name" : "continent"
	},
	{
		"cd_geo_political_type_id" : 12,
		"cd_geo_political_type_name" : "continental-region"
	},
	{
		"cd_geo_political_type_id" : 13,
		"cd_geo_political_type_name" : "canton"
	},
	{
		"cd_geo_political_type_id" : 14,
		"cd_geo_political_type_name" : "division"
	},
	{
		"cd_geo_political_type_id" : 15,
		"cd_geo_political_type_name" : "narional-region"
	},
	{
		"cd_geo_political_type_id" : 16,
		"cd_geo_political_type_name" : "region"
	},
	{
		"cd_geo_political_type_id" : 17,
		"cd_geo_political_type_name" : "administrative-capital-city"
	},
	{
		"cd_geo_political_type_id" : 18,
		"cd_geo_political_type_name" : "business-capital-city"
	},
	{
		"cd_geo_political_type_id" : 19,
		"cd_geo_political_type_name" : "world-globe"
	}
]
