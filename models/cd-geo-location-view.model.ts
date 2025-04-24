import {
    Entity,
    Column,
    PrimaryColumn
} from 'typeorm';

@Entity({
    name: 'cd_geo_location_view',
    synchronize: false
})
export class CdGeoLocationViewModel {

    @PrimaryColumn({
        name: 'cd_geo_location_id'
    })
    cdGeoLocationId: number;

    @Column({
        name: 'cd_geo_location_guid',
        nullable: true
    })
    cdGeoLocationGuid?: string;

    @Column({
        name: 'cd_geo_location_name',
        nullable: true
    })
    cdGeoLocationName?: string;

    @Column({
        name: 'cd_geo_location_description',
        nullable: true
    })
    cdGeoLocationDescription?: string;

    @Column({
        name: 'lat',
        nullable: true
    })
    lat?: number;

    @Column({
        name: 'long',
        nullable: true
    })
    long?: number;

    @Column({
        name: 'cd_geo_boundary_data',
        nullable: true
    })
    cdGeoBoundaryData?: string;

    @Column({
        name: 'doc_id',
        nullable: true
    })
    docId?: number;

    @Column({
        name: 'cd_geo_location_code',
        nullable: true
    })
    cdGeoLocationCode?: string;

    @Column({
        name: 'cd_geo_location_icon',
        nullable: true
    })
    cdGeoLocationIcon?: string;

    @Column({
        name: 'back4app_obectId',
        nullable: true
    })
    back4appObectId?: string;

    @Column({
        name: 'cd_geo_political_type_id',
        nullable: true
    })
    cdGeoPoliticalTypeId?: number;

    @Column({
        name: 'cd_geo_political_parent_id',
        nullable: true
    })
    cdGeoPoliticalParentId?: number;

    @Column({
        name: 'cd_geo_location_name_alt',
        nullable: true
    })
    cdGeoLocationNameAlt?: string;

    @Column({
        name: 'geo_boundary_data',
        nullable: true
    })
    geoBoundaryData?: string;

    @Column({
        name: 'cd_geo_location_enabled',
        nullable: true
    })
    cdGeoLocationEnabled?: boolean;

    @Column({
        name: 'cd_geo_location_assoc',
        nullable: true
    })
    cdGeoLocationAssoc?: string;

    @Column({
        name: 'cd_geo_location_population',
        nullable: true
    })
    cdGeoLocationPopulation?: number;

    @Column({
        name: 'cd_geo_location_display',
        nullable: true
    })
    cdGeoLocationDisplay?: string;

    @Column({
        name: 'cd_geo_political_type_guid',
        nullable: true
    })
    cdGeoPoliticalTypeGuid?: string;

    @Column({
        name: 'cd_geo_political_type_name',
        nullable: true
    })
    cdGeoPoliticalTypeName?: string;

    @Column({
        name: 'cd_geo_political_type_description',
        nullable: true
    })
    cdGeoPoliticalTypeDescription?: string;
}
