import { BaseService } from "../../../sys/base/base.service";
import { CdService } from "../../../sys/base/cd.service";
import { SessionService } from "../../../sys/user/services/session.service";
import { UserService } from "../../../sys/user/services/user.service";
import {
  CreateIParams,
  IQuery,
  IRespInfo,
  IServiceInput,
  IUser,
  ICdRequest,
  IFetchInput,
  CdFxReturn,
} from "../../../sys/base/IBase";
import { CdGeoLocationModel } from "../models/cd-geo-location.model";
// import { CdGeoLocationViewModel, siGet } from '../models/cd-geo-location-view.model';
// import { CdGeoLocationViewModel } from '../models/cd-geo-location-view.model';
import { siGet } from "../../../sys/base/base.model";
import config from "../../../../config";
import { Logging } from "../../../sys/base/winston.log";
import { CoopStatPublicFilterService } from "../../coops/services/coop-stat-public-filter.service";
import { CdGeoLocationViewModel } from "../models/cd-geo-location-view.model";
import { CdGeoPhysicalTypeModel } from "../models/cd-geo-physical-type.model";
import { CdGeoPoliticalTypeModel } from "../models/cd-geo-political-type.model";

export class CdGeoLocationService extends CdService {
  logger: Logging;
  b: any; // instance of BaseService
  cdToken: string;
  srvSess: SessionService;
  srvUser: UserService;
  user: IUser;
  serviceModel: CdGeoLocationModel;
  modelName: "CdGeoLocationModel";
  sessModel;
  // moduleModel: ModuleModel;

  /*
   * create rules
   */
  cRules: any = {
    required: ["cdGeoLocationName", "cdGeoPoliticalTypeId"],
    noDuplicate: ["cdGeoLocationName", "cdGeoPoliticalTypeId"],
  };
  uRules: any[];
  dRules: any[];

  constructor() {
    super();
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdGeoLocationModel();
  }

  /**
    * {
       "ctx": "App",
       "m": "CdGeoLocations",
       "c": "CdGeoLocation",
       "a": "Create",
       "dat": {
           "f_vals": [
           {
               "data": {
                   "cd-geo-locationGuid":"",
                   "cd-geo-locationName": "Benin", 
                   "cd-geo-locationDescription":"2005",
                   "cdGeoLocationId":null,
                   "cd-geo-locationWoccu": false,
                   "cd-geo-locationCount": null,
                   "cd-geo-locationMembersCount": 881232, 
                   "cd-geo-locationSavesShares":56429394,
                   "cd-geo-locationLoans":45011150,
                   "cd-geo-locationReserves":null, 
                   "cd-geo-locationAssets": null,
                   "cd-geo-locationMemberPenetration":20.95,
                   "cd-geo-locationDateLabel": "2005-12-31 23:59:59",
                   "cd-geo-locationRefId":null
               }
           }
           ],
           "token": "3ffd785f-e885-4d37-addf-0e24379af338"
       },
       "args": {}
       }
    * @param req
    * @param res
    */
  async create(req, res) {
    this.logger.logInfo("cd-geo-location/create::validateCreate()/01");

    const svSess = new SessionService();
    if (await this.validateCreate(req, res)) {
      await this.beforeCreate(req, res);
      const serviceInput = {
        serviceModel: CdGeoLocationModel,
        modelName: "CdGeoLocationModel",
        serviceModelInstance: this.serviceModel,
        docName: "Create CdGeoLocation",
        dSource: 1,
      };
      this.logger.logInfo(
        "CdGeoLocationService::create()/serviceInput:",
        serviceInput
      );
      const respData = await this.b.create(req, res, serviceInput);
      this.b.i.app_msg = "new CdGeoLocation created";
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = await respData;
      const r = await this.b.respond(req, res);
    } else {
      this.logger.logInfo("cd-geo-location/create::validateCreate()/02");
      const r = await this.b.respond(req, res);
    }
  }

  async createSL(req, res) {
    const svSess = new SessionService();
    await this.b.initSqlite(req, res);
    if (await this.validateCreateSL(req, res)) {
      await this.beforeCreateSL(req, res);
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdGeoLocationModel,
        serviceModelInstance: this.serviceModel,
        docName: "Create CdGeoLocation",
        dSource: 1,
      };
      const result = await this.b.createSL(req, res, serviceInput);
      this.b.connSLClose();
      this.b.i.app_msg = "";
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = result;
      const r = await this.b.respond(req, res);
    } else {
      const r = await this.b.respond(req, res);
    }
  }

  async createI(
    req,
    res,
    createIParams: CreateIParams
  ): Promise<CdGeoLocationModel | boolean> {
    return await this.b.createI(req, res, createIParams);
  }

  /**
     * CreateM, Create multiple records
     *  - 1. validate the loop field for multiple data
     *  - 2. loop through the list
     *  - 3. in each cycle:
     *      - get createItem
     *      - createI(createItem)
     *      - save return value
     *  - 4. set return data
     *  - 5. return data
     * 
     * {
        "ctx": "App",
        "m": "CdGeoLocations",
        "c": "CdGeoLocation",
        "a": "CreateM",
        "dat": {
            "f_vals": [
            {
                "data": [
                {
                    "cd-geo-locationGuid": "",
                    "cd-geo-locationName": "Kenya",
                    "cd-geo-locationDescription": "2006",
                    "cdGeoLocationId": null,
                    "cd-geo-locationWoccu": false,
                    "cd-geo-locationCount": 2993,
                    "cd-geo-locationMembersCount": 3265545,
                    "cd-geo-locationSavesShares": 1608009012,
                    "cd-geo-locationLoans": 1604043550,
                    "cd-geo-locationReserves": 102792479,
                    "cd-geo-locationAssets": 2146769999,
                    "cd-geo-locationMemberPenetration": 16.01,
                    "cd-geo-locationDateLabel": "2006-12-31 23:59:59",
                    "cd-geo-locationRefId": null
                },
                {
                    "cd-geo-locationGuid": "",
                    "cd-geo-locationName": "Malawi",
                    "cd-geo-locationDescription": "2006",
                    "cdGeoLocationId": null,
                    "cd-geo-locationWoccu": false,
                    "cd-geo-locationCount": 70,
                    "cd-geo-locationMembersCount": 62736,
                    "cd-geo-locationSavesShares": 6175626,
                    "cd-geo-locationLoans": 4946246,
                    "cd-geo-locationReserves": 601936,
                    "cd-geo-locationAssets": 7407250,
                    "cd-geo-locationMemberPenetration": 0.9,
                    "cd-geo-locationDateLabel": "2006-12-31 23:59:59",
                    "cd-geo-locationRefId": null
                }
                ]
            }
            ],
            "token": "3ffd785f-e885-4d37-addf-0e24379af338"
        },
        "args": {}
        }
     * 
     * 
     * @param req 
     * @param res 
     */
  async createM(req, res) {
    this.logger.logInfo("CdGeoLocationService::createM()/01");
    let data = req.post.dat.f_vals[0].data;
    this.logger.logInfo("CdGeoLocationService::createM()/data:", data);
    // this.b.models.push(CdGeoLocationModel)
    // this.b.init(req, res)

    for (var CdGeoLocationData of data) {
      this.logger.logInfo("CdGeoLocationData", CdGeoLocationData);
      const CdGeoLocationQuery: CdGeoLocationModel = CdGeoLocationData;
      const svCdGeoLocation = new CdGeoLocationService();
      // this.b.setPlDataM(req,CdGeoLocationData, { key: 'cdGeoLocationGuid', value: this.b.getGuid() });
      CdGeoLocationData.cdGeoLocationGuid = this.b.getGuid();

      const si = {
        serviceInstance: svCdGeoLocation,
        serviceModel: CdGeoLocationModel,
        serviceModelInstance: svCdGeoLocation.serviceModel,
        docName: "CdGeoLocationService::CreateM",
        dSource: 1,
      };
      const createIParams: CreateIParams = {
        serviceInput: si,
        controllerData: CdGeoLocationQuery,
      };

      let ret = await this.createI(req, res, createIParams);
      this.logger.logInfo("CdGeoLocationService::createM()/forLoop/ret:", {
        ret: ret,
      });
    }
    // return current sample data
    // eg first 5
    // this is just a sample for development
    // producation can be tailored to requrement
    // and the query can be set from the client side.
    let q = {
      where: {},
      take: 6,
      skip: 0,
      order: {
        cdGeoLocationId: "DESC",
      },
    };
    this.getCdGeoLocation(req, res, q);
  }

  async beforeCreate(req, res): Promise<any> {
    this.b.setPlData(req, {
      key: "cdGeoLocationGuid",
      value: this.b.getGuid(),
    });
    this.b.setPlData(req, { key: "cdGeoLocationEnabled", value: true });
    return true;
  }

  async beforeCreateSL(req, res): Promise<any> {
    this.b.setPlData(req, {
      key: "cdGeoLocationGuid",
      value: this.b.getGuid(),
    });
    this.b.setPlData(req, { key: "cdGeoLocationEnabled", value: true });
    return true;
  }

  async read(req, res, serviceInput: IServiceInput): Promise<any> {
    // const serviceInput: IServiceInput = {
    //     serviceInstance: this,
    //     serviceModel: CdGeoLocationModel,
    //     docName: 'CdGeoLocationService::CdGeoLocationExists',
    //     cmd: {
    //         action: 'find',
    //         query: { where: params.filter }
    //     },
    //     dSource: 1,
    // }
    return this.b.read(req, res, serviceInput);
  }

  async CdGeoLocationExists(req, res, params): Promise<boolean> {
    const serviceInput: IServiceInput = {
      serviceInstance: this,
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::CdGeoLocationExists",
      cmd: {
        action: "find",
        query: { where: params.filter },
      },
      dSource: 1,
    };
    return this.b.read(req, res, serviceInput);
  }

  async validateGeoLocation(req, res, q: IQuery): Promise<boolean> {
    const svCdGeoLocation = new CdGeoLocationService();
    const serviceInput: IServiceInput = {
      serviceInstance: this,
      serviceModel: CdGeoLocationViewModel,
      docName: "CoopMemberService::validateGeoLocation",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    const locations: CdGeoLocationViewModel[] = await svCdGeoLocation.read(
      req,
      res,
      serviceInput
    );
    if (locations.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async readSL(req, res, serviceInput: IServiceInput): Promise<any> {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocation/q:", q);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdGeoLocationService::read$()/r:', r)
        this.b.i.code = "CdGeoLocationService::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.connSLClose();
        this.b.respond(req, res);
      });
    } catch (e) {
      this.logger.logInfo("CdGeoLocationService::read$()/e:", e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdGeoLocationService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }

  update(req, res) {
    // this.logger.logInfo('CdGeoLocationService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdGeoLocationService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }

  updateSL(req, res) {
    this.logger.logInfo("CdGeoLocationService::update()/01");
    let q = this.b.getQuery(req);
    q = this.beforeUpdateSL(q);
    const serviceInput = {
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    this.logger.logInfo("CdGeoLocationService::update()/02");
    this.b.updateSL$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }

  /**
   * harmonise any data that can
   * result in type error;
   * @param q
   * @returns
   */
  beforeUpdate(q: any) {
    if (q.update.CdGeoLocationEnabled === "") {
      q.update.CdGeoLocationEnabled = null;
    }
    return q;
  }

  beforeUpdateSL(q: any) {
    if (q.update.billEnabled === "") {
      q.update.billEnabled = null;
    }
    return q;
  }

  async remove(req, res) {
    //
  }

  /**
   * methods for transaction rollback
   */
  rbCreate(): number {
    return 1;
  }

  rbUpdate(): number {
    return 1;
  }

  rbDelete(): number {
    return 1;
  }

  async validateCreate(req, res) {
    this.logger.logInfo(
      "cd-geo-location/CdGeoLocationService::validateCreate()/01"
    );
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: CdGeoLocationModel,
    };
    this.b.i.code = "CdGeoLocationService::validateCreate";
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo(
        "cd-geo-location/CdGeoLocationService::validateCreate()/02"
      );
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo(
          "cd-geo-location/CdGeoLocationService::validateCreate()/03"
        );
        ret = true;
      } else {
        this.logger.logInfo(
          "cd-geo-location/CdGeoLocationService::validateCreate()/04"
        );
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(
          ", "
        )} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo(
        "cd-geo-location/CdGeoLocationService::validateCreate()/05"
      );
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(
        ", "
      )} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo(
      "cd-geo-location/CdGeoLocationService::validateCreate()/06"
    );
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the CdGeoLocationTypeId referenced exists
    // const pl: CdGeoLocationModel = this.b.getPlData(req);
    // if ('CdGeoLocationTypeId' in pl) {
    //     this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/07')
    //     this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: CdGeoLocationTypeModel,
    //         docName: 'CdGeoLocationService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { CdGeoLocationTypeId: pl.CdGeoLocationTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `CdGeoLocation type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('cd-geo-location/CdGeoLocationService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `CdGeoLocationTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocation/12");
    if (this.b.err.length > 0) {
      this.logger.logInfo(
        "cd-geo-location/CdGeoLocationService::validateCreate()/13"
      );
      ret = false;
    }
    return ret;
  }

  async validateCreateSL(req, res) {
    return true;
  }

  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdGeoLocations","c": "CdGeoLocation","a": "Get","dat": {"f_vals": [{"query": {"where": {"cd-geo-locationName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdGeoLocation(req, res, q: IQuery = null): Promise<any> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocation/f:", q);
    this.logger.logInfo(
      "CdGeoLocationService::this.serviceModel:",
      this.serviceModel
    );
    this.serviceModel = new CdGeoLocationModel();
    const serviceInput: IServiceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = this.serviceModel;
    serviceInput.serviceModel = CdGeoLocationModel;
    this.logger.logInfo(
      "CdGeoLocationService::serviceInput:",
      this.serviceModel
    );
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      this.logger.logInfo("CdGeoLocationService::read$()/e:", e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }

  /**
   * Queey params:
   * - selected data level eg all-available, world, continent, country, continental-region, national-region
   * - list of selected items
   * - eg:
   * - on selection of all-available, show list of countries availaable with summary data
   * - on selection of world show continents with available data
   * - on selection of continent show list of countries availaable with summary data
   * - on selection of countrie list of national-resions availaable with summary data
   * - on selection of national-region given national-resion with summary data
   * @param q
   */
  async getCdGeoLocationStats(req, res, q: IQuery = null): Promise<any> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocation/f:", q);
    const serviceInput = siGet(q, this);
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      this.logger.logInfo("CdGeoLocationService::read$()/e:", e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }

  async getCdGeoLocationSL(req, res) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocation/q:", q);
    const serviceInput = siGet(q, this);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdGeoLocationService::read$()/r:', r)
        this.b.i.code = "CdGeoLocationService::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.connSLClose();
        this.b.respond(req, res);
      });
    } catch (e) {
      this.logger.logInfo("CdGeoLocationService::read$()/e:", e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdGeoLocationService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }

  // /**
  //  *
  //  * curl test:
  //  * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdGeoLocations","c": "CdGeoLocation","a": "GetType","dat":{"f_vals": [{"query":{"where": {"CdGeoLocationTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
  //  * @param req
  //  * @param res
  //  */
  // getCdGeoLocationType(req, res) {
  //     const q = this.b.getQuery(req);
  //     this.logger.logInfo('CdGeoLocationService::getCdGeoLocation/f:', q);
  //     const serviceInput = {
  //         serviceModel: CdGeoLocationTypeModel,
  //         docName: 'CdGeoLocationService::getCdGeoLocationType$',
  //         cmd: {
  //             action: 'find',
  //             query: q
  //         },
  //         dSource: 1
  //     }
  //     try {
  //         this.b.read$(req, res, serviceInput)
  //             .subscribe((r) => {
  //                 // this.logger.logInfo('CdGeoLocationService::read$()/r:', r)
  //                 this.b.i.code = 'CdGeoLocationController::Get';
  //                 const svSess = new SessionService();
  //                 svSess.sessResp.cd_token = req.post.dat.token;
  //                 svSess.sessResp.ttl = svSess.getTtl();
  //                 this.b.setAppState(true, this.b.i, svSess.sessResp);
  //                 this.b.cdResp.data = r;
  //                 this.b.respond(req, res)
  //             })
  //     } catch (e) {
  //         this.logger.logInfo('CdGeoLocationService::read$()/e:', e)
  //         this.b.err.push(e.toString());
  //         const i = {
  //             messages: this.b.err,
  //             code: 'BaseService:update',
  //             app_msg: ''
  //         };
  //         this.b.serviceErr(req, res, e, i.code)
  //         this.b.respond(req, res)
  //     }
  // }

  /**
   *
   * @param req
   * @param res
   */
  getCdGeoLocationPaged(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocation/q:", q);
    const serviceInput = {
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::getCdGeoLocation$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdGeoLocationController::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }

  getPagedSL(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdGeoLocationService::getCdGeoLocationCount()/q:", q);
    const serviceInput = {
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::getCdGeoLocationCount",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCountSL$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdGeoLocationService::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }

  // getCdGeoLocationTypeCount(req, res) {
  //     const q = this.b.getQuery(req);
  //     this.logger.logInfo('CdGeoLocationService::getCdGeoLocationCount/q:', q);
  //     const serviceInput = {
  //         serviceModel: CdGeoLocationTypeModel,
  //         docName: 'CdGeoLocationService::getCdGeoLocationCount$',
  //         cmd: {
  //             action: 'find',
  //             query: q
  //         },
  //         dSource: 1
  //     }
  //     this.b.readCount$(req, res, serviceInput)
  //         .subscribe((r) => {
  //             this.b.i.code = 'CdGeoLocationController::Get';
  //             const svSess = new SessionService();
  //             svSess.sessResp.cd_token = req.post.dat.token;
  //             svSess.sessResp.ttl = svSess.getTtl();
  //             this.b.setAppState(true, this.b.i, svSess.sessResp);
  //             this.b.cdResp.data = r;
  //             this.b.respond(req, res)
  //         })
  // }

  delete(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdGeoLocationService::delete()/q:", q);
    const serviceInput = {
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::delete",
      cmd: {
        action: "delete",
        query: q,
      },
      dSource: 1,
    };

    this.b.delete$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }

  deleteSL(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdGeoLocationService::deleteSL()/q:", q);
    const serviceInput = {
      serviceModel: CdGeoLocationModel,
      docName: "CdGeoLocationService::deleteSL",
      cmd: {
        action: "delete",
        query: q,
      },
      dSource: 1,
    };

    this.b.deleteSL$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }

  /**
   *
   * test GetCountry via curl:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdGeo","c": "CdGeoLocation","a": "GetContinent","dat": {"f_vals": [{"query": {"class":"Continentscountriescities_Continent","where": {},"skip": 0,"take": 20,"orderBy": "name"}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {} }' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  async GetContinent(req, res) {
    const q: IQuery = this.b.getQuery(req);
    let queryStr = "";
    if (this.b.isEmptyObject(q.where)) {
      queryStr = `/classes/${q.class}?skip=${q.skip}&limit=${q.take}&order=${q.order}`;
    } else {
      queryStr = `/classes/${q.class}?where=${JSON.stringify(q.where)}&skip=${
        q.skip
      }&limit=${q.take}&order=${q.order}`;
    }

    // let queryStr = `/Continentscountriescities_Country/${pl.back4appObectId}`
    this.logger.logInfo(
      "cd-geo-location/Continentscountriescities_Country()/queryStr:",
      { queryStr: queryStr }
    );
    const fi: IFetchInput = {
      url: config.back4app.url + queryStr,
      optins: {
        headers: {
          "X-Parse-Application-Id": config.back4app.appId,
          "X-Parse-REST-API-Key": config.back4app.apiKey,
        },
      },
    };

    this.logger.logInfo("cd-geo-location/SubdivisionStatesProvinces()/01");

    const svSess = new SessionService();
    const serviceInput: IServiceInput = {
      serviceModel: CdGeoLocationModel,
      modelName: "CdGeoLocationModel",
      serviceModelInstance: this.serviceModel,
      docName: "Create CdGeoLocation",
      dSource: 1,
      fetchInput: fi,
    };
    const respData = this.b.bFetch(req, res, serviceInput);
    this.b.i.app_msg = `fetched data from ${fi.url} `;
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = await respData;
    const r = await this.b.respond(req, res);
  }

  /**
   *
   * test GetCountry via curl:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdGeo","c": "CdGeoLocation","a": "GetCountry","dat": {"f_vals": [{"query": {"class":"Continentscountriescities_Country","where": {"name":"Swaziland"},"skip": 0,"take": 20,"orderBy": "name"}}],,"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {} }' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  async GetCountry(req, res) {
    const q: IQuery = this.b.getQuery(req);
    let queryStr = `/classes/${q.class}?where=${JSON.stringify(q.where)}&skip=${
      q.skip
    }&limit=${q.take}&order=${q.order}`;
    // let queryStr = `/Continentscountriescities_Country/${pl.back4appObectId}`
    this.logger.logInfo(
      "cd-geo-location/Continentscountriescities_Country()/queryStr:",
      { queryStr: queryStr }
    );
    const fi: IFetchInput = {
      url: config.back4app.url + queryStr,
      optins: {
        headers: {
          "X-Parse-Application-Id": config.back4app.appId,
          "X-Parse-REST-API-Key": config.back4app.apiKey,
        },
      },
    };

    this.logger.logInfo("cd-geo-location/SubdivisionStatesProvinces()/01");

    const svSess = new SessionService();
    const serviceInput: IServiceInput = {
      serviceModel: CdGeoLocationModel,
      modelName: "CdGeoLocationModel",
      serviceModelInstance: this.serviceModel,
      docName: "Create CdGeoLocation",
      dSource: 1,
      fetchInput: fi,
    };
    const respData = this.b.bFetch(req, res, serviceInput);
    this.b.i.app_msg = `fetched data from ${fi.url} `;
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = await respData;
    const r = await this.b.respond(req, res);
  }

  /**
   *
   * test SubdivisionStatesProvinces via curl:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdGeo","c": "CdGeoLocation","a": "SubdivisionStatesProvinces","dat": {"f_vals": [{"query": {"class":"Continentscountriescities_Subdivisions_States_Provinces","where": {"Country_Code":"KE"},"skip": 0,"take": 20,"orderBy": "country"}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {} }' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  async SubdivisionStatesProvinces(req, res) {
    const q: IQuery = this.b.getQuery(req);
    let queryStr = `/classes/${q.class}?where=${JSON.stringify(q.where)}&skip=${
      q.skip
    }&limit=${q.take}&order=${q.order}`;
    this.logger.logInfo(
      "cd-geo-location/SubdivisionStatesProvinces()/queryStr:",
      { queryStr: queryStr }
    );
    const fi: IFetchInput = {
      url: config.back4app.url + queryStr,
      optins: {
        headers: {
          "X-Parse-Application-Id": config.back4app.appId,
          "X-Parse-REST-API-Key": config.back4app.apiKey,
        },
      },
    };
    // const serviceInput: IServiceInput = {
    //     serviceModel: CdGeoLocationModel,
    //     modelName: "CdGeoLocationModel",
    //     serviceModelInstance: this.serviceModel,
    //     docName: 'Create CdGeoLocation',
    //     dSource: 1,
    //     fetchInput: fi
    // }
    // this.b.bFetch(req, res, serviceInput)
    ////////////////////////////
    this.logger.logInfo("cd-geo-location/SubdivisionStatesProvinces()/01");

    const svSess = new SessionService();
    const serviceInput: IServiceInput = {
      serviceModel: CdGeoLocationModel,
      modelName: "CdGeoLocationModel",
      serviceModelInstance: this.serviceModel,
      docName: "Create CdGeoLocation",
      dSource: 1,
      fetchInput: fi,
    };
    const respData = this.b.bFetch(req, res, serviceInput);
    this.b.i.app_msg = `fetched data from ${fi.url} `;
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = await respData;
    const r = await this.b.respond(req, res);
  }

  async getGeoLocationI(
    req,
    res,
    q: IQuery = null
  ): Promise<CdFxReturn<CdGeoLocationViewModel[]>> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo("CdGeoLocationService::getGeoLocationI/q:", q);
    let serviceModel = new CdGeoLocationViewModel();
    const serviceInput: IServiceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdGeoLocationViewModel;
    try {
      let respData = await this.b.read(req, res, serviceInput);
      return { state: true, data: respData, message: null };
    } catch (e) {
      this.logger.logInfo("CdGeoLocationService::getGeoLocationI()/e:", e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdGeoLocationService:getGeoLocationI",
        app_msg: "",
      };
      return { state: false, data: null, message: e.toString() };
    }
  }

  async getCountriesInContinent(
    req,
    res,
    continentId: number
  ): Promise<CdGeoLocationViewModel[]> {
    const r = await this.getGeoLocationI(req, res, {
      select:['cdGeoLocationId'],
      where: { cdGeoPoliticalParentId: continentId },
    });
    if(!r.state || !r.data){
      return null;
    } else {
      return r.data
    }
  }

  async getGeoPoliticalTypeI(
    req,
    res,
    q: IQuery = null
  ): Promise<{ data: CdGeoPoliticalTypeModel[]; error: string }> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo("CdGeoLocationService::getGeoPoliticalTypeI/q:", q);
    let serviceModel = new CdGeoPoliticalTypeModel();
    const serviceInput: IServiceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdGeoPoliticalTypeModel;
    try {
      let respData = await this.b.read(req, res, serviceInput);
      return { data: respData, error: null };
    } catch (e) {
      this.logger.logInfo("CdGeoLocationService::getGeoPoliticalTypeI()/e:", e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdGeoLocationService:getGeoPoliticalTypeI",
        app_msg: "",
      };
      return { data: null, error: e };
    }
  }
}
