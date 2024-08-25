mport fs from 'fs';
import process from 'process';

export interface ConfigFile {
    placeId: string;
    shopName: string;
    shopNickname: string;
    regionId: number;
    country: string;
    regionName: string;
    serverIp?: string;
    gameOptions: GameOptions;
    unix?: UnixOptions;
    notices?: string[];
    sentryDsn?: string;
    noticeWindow?: string[];
    screenshot: string;
    website?: number;
    announcement?: string;
}

export interface UnixOptions {
    setuid: number;
    setgid: number;
}

export interface GameOptions {

    // If set to 1, all gift cars (i.e. S2000, S660, etc. will be fully tuned.)
    // If set to 0, they will be left at their default tune (i.e. stock, basic tune, etc.)
    giftCarsFullyTuned: number;
    
    // If set to 1, the scratch game will be enabled and the player 
    // will be allowed to scratch boxes once every day. If this is 
    // set to 0, the scratch sheet will always be unavailable, 
    // however previously recieved items (or items provided by 
    // grantAllScratchRewards) will still be available. If the 
    // value is set to 2, there will be no limits on the number 
    // of times the player can scratch daily.
    scratchEnabled: number;
    
    // If set to 0, the standard scratch sheets (Same as the actual game)
    // will be available in order, e.g. R2, Corolla, and so on. 
    
    // If it is set to 1, random scratch sheets will be generated 
    // (with 1 scratch car, 25 window stickers, and 24 versus markers infinitely.)

    // OPTION 1 IS IN PROGRESS! PLEASE USE OPTION 2 FOR NOW! (1)
    scratchType: number;

    // Amount of full-tunes to grant to newly registered cards
    grantFullTuneTicketToNewUsers: number;

    // Give meter reward every n*100 play
    giveMeterReward: number; // 1 is on, 0 is off
    	
    // if the new card is not in the User databese
    // set this option to 1 will not create a new card
    // and prevent new card registration
    newCardsBanned: number; // 1 is on, 0 is off

    // revision check
    // set this option to 1 will block not matched revision
    // and from connecting to the server
    // Protobuff Revision W6W: 12056, W6R : 8053
    revisionCheck: number; // 1 is on, 0 is off

    // revision check
    // set this option to 1 to enable screenshot feature
    enableScreenshot: number; // 1 is on, 0 is off

    // Gift Special Cars to newly registered cards
    giftCarsTicketToNewUsers: number;

    // Gift Meter for new car 0-41
    grantMeterToNewcar: number;

    // Gift Nameplate for new car 0-246
    grantNameplateToNewcar: number;

    // Gift Custom Color for new car 0-41
    grantCustomcolorTonewCar: number;

    // Gift BGM for new car 0-6
    grantBGMTonewCar: number;

    //Gift Aero full set for new car 0-11
    grantAerofullsetTonewCar: number;

    //Gift Aero for new car 0-3
    grantAeroTonewCar: number;

    //Gift Bonnet for new car 0-8
    grantBonnetTonewCar: number;

    //Gift Wing for new car 0-8
    grantWingTonewCar: number;

    //Gift Wheel for new car 0-51
    grantWheelTonewCar: number;

    //Gift Mirror for new car 0-2
    grantMirrorTonewCar: number;

    //Gift Neon for new car 0-10
    grantNeonTonewCar: number;

    //Gift Trunk for new car 0.1
    grantTrunkTonewCar: number;

    //Gift Number plate for new car 0-4
    grantNumberplateTonewCar: number;

    //Gift GT Wing for new car 0-1
    grantGTWingTonewCar: number;

    //Gift Aura VS for new car 0-44
    grantAuraVSTonewCar: number;

    //Gift Windows Decoration for new car 0-60
    grantWindowsDecorationTonewCar: number;

    //Gift Rival Marker for new car 0-80
    grantRivalMarkerTonewCar: number;

    //Gift Stamp for new car 0-168
    grantStampTonewCar: number;

    //Gift Custom Name Frame for new car (W6W Only)
    /* ##6RR Feature## grantCustomframTonewCar: number; */

    //Show highlight notice message during User Car Selection
    //Implement	["custom message"] through config(.)json
    notices: string;

    //Display announcement like Wangan Navi rewards, Game Features or 
    //implement custom through FileList for attract screen
    //(various pix resolution)
    featureAnnouncement: string;

}

export class Config {
    private static cfg: ConfigFile;

    static load() {
        console.log('Loading config file...');
        let cfgPath = process.env['BAYSHORE_CONFIG_PATH'];
        if (!cfgPath)
            cfgPath = './config.json';
        let cfg = fs.readFileSync(cfgPath, 'utf-8');
        let json = JSON.parse(cfg);
        this.cfg = json as ConfigFile;
    }

    static getConfig(): ConfigFile {
        if (!this.cfg)
            this.load();
        
        return this.cfg;
    }
}
