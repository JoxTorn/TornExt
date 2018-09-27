(function(){

    var alignLeft = false;
    var hideLevel = true;
    var conatinerMargin = '30px';

    TornLeftPromise = TornExtStorage.get('AlignTornLeft');
    TornLeftPromise.then((e) => {
        alignLeft = e.AlignTornLeft;

        if(alignLeft){
            document.documentElement.classList.add('my-torn-left-aligned');
            document.documentElement.style.setProperty('--container-margin', conatinerMargin);
        }
    })

    LvlHidePromise = TornExtStorage.get('HideLelvel');
    LvlHidePromise.then((e) => {
        //hideLevel = e.HideLelvel;

        if(!hideLevel){
            document.documentElement.style.setProperty('--level-hold-display', 'block');
        }
        else {
            document.documentElement.style.removeProperty('--level-hold-display');
        }
        /*
        var info = document.querySelectorAll('.info-msg-cont.green');
        for (const elem of info) {
            if(elem.textContent.match('Congratulations! You have enough')){
                elem.style.removeProperty('--level-hold-display');
                elem.nextSibling.style.removeProperty('--level-hold-display');
            }
            else{
                elem.style.setProperty('--level-hold-display','block');
                elem.nextSibling.style.setProperty('--level-hold-display','block');
            }
        }
        */
    })    
    
})()

var TornExtGlobal = (function(){

    function insertBefore(element, before){
        before.parentNode.insertBefore(element, before);
    }
    
    function insertAfter(element, after){
        after.parentNode.insertBefore(element, after.nextSibling);
    }
    
    function inserFirst(element, parent){
        insertBefore(element, parent.children[0]);
    }
    
    function createElement(tag){
        return document.createElement(tag);
    }
    
    function createTextNode(text){
        return document.createTextNode(text);
    }
    
    
    function appendChild(parent, child){
        parent.appendChild(child);
        return child;
    }

    const crimeGroups = [
        {
            nerve: 2,
            title: 'Search for cash',
            image: 'a'
        }, {
            nerve: 3,
            title: 'Sell copied media',
            image: 'b'
        }, {
            nerve: 4,
            title: 'Shoplift',
            image: 'c'
        }, {
            nerve: 5,
            title: 'Pickpocket someone',
            image: 'd'
        }, {
            nerve: 6,
            title: 'Larceny',
            image: 'e'
        }, {
            nerve: 7,
            title: 'Armed Robberies',
            image: 'f'
        }, {
            nerve: 8,
            title: 'Transport drugs',
            image: 'g'
        }, {
            nerve: 9,
            title: 'Plant a computer virus',
            image: 'h'
        }, {
            nerve: 10,
            title: 'Assassination',
            image: 'i'
        }, {
            nerve: 11,
            title: 'Arson',
            image: 'j'
        }, {
            nerve: 12,
            title: 'Grand Theft Auto',
            image: 'k'
        }, {
            nerve: 13,
            title: 'Pawn Shop',
            image: 'l'
        }, {
            nerve: 14,
            title: 'Counterfeiting',
            image: 'm'
        }, {
            nerve: 15,
            title: 'Kidnapping',
            image: 'n'
        }, {
            nerve: 16,
            title: 'Arms Trafficking',
            image: 'o'
        }, {
            nerve: 17,
            title: 'Bombings',
            image: 'p'
        }, {
            nerve: 18,
            title: 'Hacking',
            image: 'q'
        }]

    const crimes = [
            {
            type: 2,
            image: 'a',
            nerve: 2,
            id: 'search-the-train-station',
            value: 'searchtrainstation',
            title: 'Search the train station'
        }, {
            type: 2,
            image: 'a2',
            nerve: 2,
            id: 'search-under-the-old-bridge',
            value: 'searchbridge',
            title: 'Search under the old bridge'
        }, {
            type: 2,
            image: 'a3',
            nerve: 2,
            id: 'search-the-bins',
            value: 'searchbins',
            title: 'Search the bins'
        }, {
            type: 2,
            image: 'a4',
            nerve: 2,
            id: 'search-the-water-fountain',
            value: 'searchfountain',
            title: 'Search the water fountain'
        }, {
            type: 2,
            image: 'a5',
            nerve: 2,
            id: 'search-the-dumpsters',
            value: 'searchdumpster',
            title: 'Search the dumpsters'
        }, {
            type: 2,
            image: 'a6',
            nerve: 2,
            id: 'search-movie-theater',
            value: 'searchmovie',
            title: 'Search movie theater'
        }, {
            type: 2,
            image: 'b1',
            nerve: 3,
            id: 'rock-cds',
            value: 'cdrock',
            title: 'Rock CDs'
        }, {
            type: 2,
            image: 'b2',
            nerve: 3,
            id: 'heavy-metal-cds',
            value: 'cdheavymetal',
            title: 'Heavy Metal CDs'
        }, {
            type: 2,
            image: 'b3',
            nerve: 3,
            id: 'pop-cds',
            value: 'cdpop',
            title: 'Pop CDs'
        }, {
            type: 2,
            image: 'b4',
            nerve: 3,
            id: 'rap-cds',
            value: 'cdrap',
            title: 'Rap CDs'
        }, {
            type: 2,
            image: 'b5',
            nerve: 3,
            id: 'reggae-cds',
            value: 'cdreggae',
            title: 'Reggae CDs'
        }, {
            type: 2,
            image: 'b6',
            nerve: 3,
            id: 'horror-dvds',
            value: 'dvdhorror',
            title: 'Horror DVDs'
        }, {
            type: 2,
            image: 'b7',
            nerve: 3,
            id: 'action-dvds',
            value: 'dvdaction',
            title: 'Action DVDs'
        }, {
            type: 2,
            image: 'b8',
            nerve: 3,
            id: 'romance-dvds',
            value: 'dvdromance',
            title: 'Romance DVDs'
        }, {
            type: 2,
            image: 'b9',
            nerve: 3,
            id: 'sci-fi-dvds',
            value: 'dvdsci',
            title: 'Sci Fi DVDs'
        }, {
            type: 2,
            image: 'b10',
            nerve: 3,
            id: 'thriller-dvds',
            value: 'dvdthriller',
            title: 'Thriller DVDs'
        }, {
            type: 4,
            image: 'c1a',
            nerve: 4,
            id: 'a-few-chocolate-bars',
            value: 'chocolatebars',
            title: 'Sweet shop: A few chocolate bars'
        }, {
            type: 4,
            image: 'c1b',
            nerve: 4,
            id: 'a-few-bags-of-bonbons',
            value: 'bonbons',
            title: 'Sweet shop: A few bags of bonbons'
        }, {
            type: 4,
            image: 'c1c',
            nerve: 4,
            id: 'a-box-of-extra-strong-mints',
            value: 'extrastrongmints',
            title: 'Sweet shop: A box of extra strong mints'
        }, {
            type: 4,
            image: 'c2a',
            nerve: 4,
            id: 'music-stall',
            value: 'musicstall',
            title: 'Market stall: Music stall'
        }, {
            type: 4,
            image: 'c2b',
            nerve: 4,
            id: 'electronics-stall',
            value: 'electronicsstall',
            title: 'Market stall: Electronics stall'
        }, {
            type: 4,
            image: 'c2c',
            nerve: 4,
            id: 'computer-stall',
            value: 'computerstall',
            title: 'Market stall: Computer stall'
        }, {
            type: 4,
            image: 'c3a',
            nerve: 4,
            id: 'tank-top',
            value: 'tanktop',
            title: 'Clothes shop: Tank top'
        }, {
            type: 4,
            image: 'c3b',
            nerve: 4,
            id: 'trainers',
            value: 'trainers',
            title: 'Clothes shop: Trainers'
        }, {
            type: 4,
            image: 'c3c',
            nerve: 4,
            id: 'jacket',
            value: 'jacket',
            title: 'Clothes shop: Jacket'
        }, {
            type: 4,
            image: 'c4a',
            nerve: 4,
            id: 'watch',
            value: 'watch',
            title: 'Jewellery shop: Watch'
        }, {
            type: 4,
            image: 'c4b',
            nerve: 4,
            id: 'necklace',
            value: 'necklace',
            title: 'Jewellery shop: Necklace'
        }, {
            type: 4,
            image: 'c4c',
            nerve: 4,
            id: 'ring',
            value: 'ring',
            title: 'Jewellery shop: Ring'
        }, {
            type: 4,
            image: 'd1',
            nerve: 5,
            id: 'hobo',
            value: 'hobo',
            title: 'Hobo'
        }, {
            type: 4,
            image: 'd2',
            nerve: 5,
            id: 'kid',
            value: 'kid',
            title: 'Kid'
        }, {
            type: 4,
            image: 'd3',
            nerve: 5,
            id: 'old-woman',
            value: 'oldwoman',
            title: 'Old woman'
        }, {
            type: 4,
            image: 'd4',
            nerve: 5,
            id: 'businessman',
            value: 'businessman',
            title: 'Businessman'
        }, {
            type: 4,
            image: 'd5',
            nerve: 5,
            id: 'lawyer',
            value: 'lawyer',
            title: 'Lawyer'
        }, {
            type: 4,
            image: 'e1',
            nerve: 6,
            id: 'apartment',
            value: 'apartment',
            title: 'Apartment'
        }, {
            type: 4,
            image: 'e2',
            nerve: 6,
            id: 'detached-house',
            value: 'house',
            title: 'Detached house'
        }, {
            type: 4,
            image: 'e3',
            nerve: 6,
            id: 'mansion',
            value: 'mansion',
            title: 'Mansion'
        }, {
            type: 4,
            image: 'e4',
            nerve: 6,
            id: 'cars',
            value: 'cartheft',
            title: 'Cars'
        }, {
            type: 4,
            image: 'e5',
            nerve: 6,
            id: 'office',
            value: 'office',
            title: 'Office'
        }, {
            type: 4,
            image: 'f1',
            nerve: 7,
            id: 'swift-robbery',
            value: 'swiftrobbery',
            title: 'Swift robbery'
        }, {
            type: 4,
            image: 'f2',
            nerve: 7,
            id: 'thorough-robbery',
            value: 'thoroughrobbery',
            title: 'Thorough robbery'
        }, {
            type: 4,
            image: 'f3',
            nerve: 7,
            id: 'swift-convenience',
            value: 'swiftconvenient',
            title: 'Swift Convenience'
        }, {
            type: 4,
            image: 'f4',
            nerve: 7,
            id: 'thorough-convenience',
            value: 'thoroughconvenient',
            title: 'Thorough Convenience'
        }, {
            type: 4,
            image: 'f5',
            nerve: 7,
            id: 'swift-bank',
            value: 'swiftbank',
            title: 'Swift Bank'
        }, {
            type: 4,
            image: 'f6',
            nerve: 7,
            id: 'thorough-bank',
            value: 'thoroughbank',
            title: 'Thorough Bank'
        }, {
            type: 4,
            image: 'f7',
            nerve: 7,
            id: 'swift-armored-car',
            value: 'swiftcar',
            title: 'Swift Armored Car'
        }, {
            type: 4,
            image: 'f8',
            nerve: 7,
            id: 'thorough-armored-car',
            value: 'thoroughcar',
            title: 'Thorough Armored Car'
        }, {
            type: 4,
            image: 'g1',
            nerve: 8,
            id: 'transport-cannabis',
            value: 'cannabis',
            title: 'Transport Cannabis'
        }, {
            type: 4,
            image: 'g2',
            nerve: 8,
            id: 'transport-amphetamines',
            value: 'amphetamines',
            title: 'Transport Amphetamines'
        }, {
            type: 4,
            image: 'g3',
            nerve: 8,
            id: 'transport-cocaine',
            value: 'cocaine',
            title: 'Transport Cocaine'
        }, {
            type: 4,
            image: 'g4',
            nerve: 8,
            id: 'sell-cannabis',
            value: 'drugscanabis',
            title: 'Sell Cannabis'
        }, {
            type: 4,
            image: 'g5',
            nerve: 8,
            id: 'sell-pills',
            value: 'drugspills',
            title: 'Sell Pills'
        }, {
            type: 4,
            image: 'g6',
            nerve: 8,
            id: 'sell-cocaine',
            value: 'drugscocaine',
            title: 'Sell Cocaine'
        }, {
            type: 4,
            image: 'h',
            nerve: 9,
            id: 'simple-virus',
            value: 'simplevirus',
            title: 'Simple virus'
        }, {
            type: 4,
            image: 'h1',
            nerve: 9,
            id: 'polymorphic-virus',
            value: 'polymorphicvirus',
            title: 'Polymorphic virus'
        }, {
            type: 4,
            image: 'h2',
            nerve: 9,
            id: 'tunneling-virus',
            value: 'tunnelingvirus',
            title: 'Tunneling Virus'
        }, {
            type: 4,
            image: 'h3',
            nerve: 9,
            id: 'armored-virus',
            value: 'armoredvirus',
            title: 'Armored Virus'
        }, {
            type: 4,
            image: 'h4',
            nerve: 9,
            id: 'stealth-virus',
            value: 'stealthvirus',
            title: 'Stealth virus'
        }, {
            type: 4,
            image: 'i1',
            nerve: 10,
            id: 'assassinate-a-target',
            value: 'assasination',
            title: 'Assassinate a target'
        }, {
            type: 4,
            image: 'i2',
            nerve: 10,
            id: 'drive-by-shooting',
            value: 'driveby',
            title: 'Drive by Shooting'
        }, {
            type: 4,
            image: 'i3',
            nerve: 10,
            id: 'car-bomb',
            value: 'carbomb',
            title: 'Car Bomb'
        }, {
            type: 4,
            image: 'i4',
            nerve: 10,
            id: 'mob-boss',
            value: 'murdermobboss',
            title: 'Mob Boss'
        }, {
            type: 4,
            image: 'j1',
            nerve: 11,
            id: 'home',
            value: 'home',
            title: 'Home'
        }, {
            type: 4,
            image: 'j2',
            nerve: 11,
            id: 'car-lot',
            value: 'Carlot',
            title: 'Car Lot'
        }, {
            type: 4,
            image: 'j3',
            nerve: 11,
            id: 'office-building',
            value: 'OfficeBuilding',
            title: 'Office Building'
        }, {
            type: 4,
            image: 'j4',
            nerve: 11,
            id: 'apartment-building',
            value: 'aptbuilding',
            title: 'Apartment Building'
        }, {
            type: 4,
            image: 'j5',
            nerve: 11,
            id: 'warehouse',
            value: 'warehouse',
            title: 'Warehouse'
        }, {
            type: 4,
            image: 'j6',
            nerve: 11,
            id: 'motel',
            value: 'motel',
            title: 'Motel'
        }, {
            type: 4,
            image: 'j7',
            nerve: 11,
            id: 'government-building',
            value: 'govbuilding',
            title: 'Government Building'
        }, {
            type: 4,
            image: 'k1',
            nerve: 12,
            id: 'steal-a-parked-car',
            value: 'parkedcar',
            title: 'Steal a parked car'
        }, {
            type: 4,
            image: 'k2',
            nerve: 12,
            id: 'hijack-a-car',
            value: 'movingcar',
            title: 'Hijack a car'
        }, {
            type: 4,
            image: 'k3',
            nerve: 12,
            id: 'steal-car-from-showroom',
            value: 'carshop',
            title: 'Steal car from showroom'
        }, {
            type: 4,
            image: 'l1',
            nerve: 13,
            id: 'side-door',
            value: 'pawnshop',
            title: 'Side Door'
        }, {
            type: 4,
            image: 'l2',
            nerve: 13,
            id: 'rear-door',
            value: 'pawnshop',
            title: 'Rear Door'
        }, {
            type: 4,
            image: 'm1',
            nerve: 14,
            id: 'money',
            value: 'makemoney2',
            title: 'Money'
        }, {
            type: 4,
            image: 'm2',
            nerve: 14,
            id: 'casino-tokens',
            value: 'maketokens2',
            title: 'Casino tokens'
        }, {
            type: 4,
            image: 'm3',
            nerve: 14,
            id: 'credit-card',
            value: 'makecard',
            title: 'Credit card'
        }, {
            type: 4,
            image: 'n2',
            nerve: 15,
            id: 'woman',
            value: 'napwomen',
            title: 'Woman'
        }, {
            type: 4,
            image: 'n3',
            nerve: 15,
            id: 'undercover-cop',
            value: 'napcop',
            title: 'Undercover cop'
        }, {
            type: 4,
            image: 'n4',
            nerve: 15,
            id: 'mayor',
            value: 'napmayor',
            title: 'Mayor'
        }, {
            type: 4,
            image: 'o1',
            nerve: 16,
            id: 'explosives',
            value: 'trafficbomb',
            title: 'Explosives'
        }, {
            type: 4,
            image: 'o2',
            nerve: 16,
            id: 'firearms',
            value: 'trafficarms',
            title: 'Firearms'
        }, {
            type: 4,
            image: 'p1',
            nerve: 17,
            id: 'bomb-a-factory',
            value: 'bombfactory',
            title: 'Bomb a factory'
        }, {
            type: 4,
            image: 'p2',
            nerve: 17,
            id: 'bomb-a-government-building',
            value: 'bombbuilding',
            title: 'Bomb a government building'
        }, {
            type: 4,
            image: 'q1',
            nerve: 18,
            id: 'hack-into-a-bank-mainframe',
            value: 'hackbank',
            title: 'Hack into a Bank Mainframe'
        }, {
            type: 4,
            image: 'q2',
            nerve: 18,
            id: 'hack-the-f.b.i-mainframe',
            value: 'hackfbi',
            title: 'Hack the F.B.I Mainframe'
        }];


    const personalStats = [{
        key: 'bazaarcustomers',
        name: 'Bazaar Customers'
    }, {
        key: 'bazaarsales',
        name: 'Bazaar Sales'
    }, {
        key: 'bazaarprofit',
        name: 'Bazaar Profit'
    }, {
        key: 'useractivity',
        name: 'User Activity'
    }, {
        key: 'itemsbought',
        name: 'Items Bought'
    }, {
        key: 'pointsbought',
        name: 'Points Bought'
    }, {
        key: 'itemsboughtabroad',
        name: 'Items Bought Abroad'
    }, {
        key: 'weaponsbought',
        name: 'Weapons Bought'
    }, {
        key: 'trades',
        name: 'Trades'
    }, {
        key: 'itemssent',
        name: 'Items Sent'
    }, {
        key: 'auctionswon',
        name: 'Auctions Won'
    }, {
        key: 'auctionsells',
        name: 'Items Auctioned'
    }, {
        key: 'pointssold',
        name: 'Points Sold'
    }, {
        key: 'attackswon',
        name: 'Attacks Won'
    }, {
        key: 'attackslost',
        name: 'Attacks Lost'
    }, {
        key: 'attacksdraw',
        name: 'Attacks Stalemated'
    }, {
        key: 'bestkillstreak',
        name: 'Best Kill Streak'
    }, {
        key: 'moneymugged',
        name: 'Money Mugged'
    }, {
        key: 'attacksstealthed',
        name: 'Stealth Attacks'
    }, {
        key: 'attackhits',
        name: 'Hits'
    }, {
        key: 'attackmisses',
        name: 'Misses'
    }, {
        key: 'attackcriticalhits',
        name: 'Critical Hits'
    }, {
        key: 'respectforfaction',
        name: 'Total Respect Gained'
    }, {
        key: 'defendswon',
        name: 'Defends Won'
    }, {
        key: 'defendslost',
        name: 'Defends Lost'
    }, {
        key: 'defendsstalemated',
        name: 'Defends Stalemated'
    }, {
        key: 'roundsfired',
        name: 'Rounds Fired'
    }, {
        key: 'yourunaway',
        name: 'Times Ran Away'
    }, {
        key: 'theyrunaway',
        name: 'Foes Ran Away'
    }, {
        key: 'highestbeaten',
        name: 'Highest Level Beaten'
    }, {
        key: 'peoplebusted',
        name: 'People Busted'
    }, {
        key: 'failedbusts',
        name: 'Failed Busts'
    }, {
        key: 'peoplebought',
        name: 'People Bailed'
    }, {
        key: 'peopleboughtspent',
        name: 'Bail Fees'
    }, {
        key: 'virusescoded',
        name: 'Viruses Coded'
    }, {
        key: 'cityfinds',
        name: 'Items Found'
    }, {
        key: 'traveltimes',
        name: 'Times Travelled'
    }, {
        key: 'bountiesplaced',
        name: 'Bounties Placed'
    }, {
        key: 'bountiesreceived',
        name: 'Bounties Received'
    }, {
        key: 'bountiescollected',
        name: 'Bounties Collected'
    }, {
        key: 'totalbountyreward',
        name: 'Money Rewarded'
    }, {
        key: 'revives',
        name: 'Revives'
    }, {
        key: 'revivesreceived',
        name: 'Revives Received'
    }, {
        key: 'medicalitemsused',
        name: 'Medical Items Used'
    }, {
        key: 'statenhancersused',
        name: 'Stat Enhancers Used'
    }, {
        key: 'trainsreceived',
        name: 'Times Trained by Director'
    }, {
        key: 'totalbountyspent',
        name: 'Spent on Bounties'
    }, {
        key: 'drugsused',
        name: 'Drugs Used'
    }, {
        key: 'overdosed',
        name: 'Times Overdosed'
    }, {
        key: 'meritsbought',
        name: 'Merits Bought'
    }, {
        key: 'logins',
        name: 'Logins'
    }, {
        key: 'personalsplaced',
        name: 'Personals Placed'
    }, {
        key: 'classifiedadsplaced',
        name: 'Classified Ads Placed'
    }, {
        key: 'mailssent',
        name: 'Mails Sent'
    }, {
        key: 'friendmailssent',
        name: 'Mails Sent to Friends'
    }, {
        key: 'factionmailssent',
        name: 'Mails Sent to Faction'
    }, {
        key: 'companymailssent',
        name: 'Mails Sent to Colleagues'
    }, {
        key: 'spousemailssent',
        name: 'Mails Sent to Spouse'
    }, {
        key: 'largestmug',
        name: 'Largest Mug'
    }, {
        key: 'medstolen',
        name: 'Medical Items Stolen'
    }, {
        key: 'spydone',
        name: 'Army Spying'
    }, {
        key: 'cantaken',
        name: 'Cannabis Taken'
    }, {
        key: 'exttaken',
        name: 'Ecstasy Taken'
    }, {
        key: 'lsdtaken',
        name: 'LSD Taken'
    }, {
        key: 'shrtaken',
        name: 'Shrooms Taken'
    }, {
        key: 'xantaken',
        name: 'Xanax Taken'
    }, {
        key: 'victaken',
        name: 'Vicodin Taken'
    }, {
        key: 'chahits',
        name: 'Machinery'
    }, {
        key: 'axehits',
        name: 'Clubbed Weapons'
    }, {
        key: 'grehits',
        name: 'Temporary Weapons'
    }, {
        key: 'pishits',
        name: 'Pistols'
    }, {
        key: 'rifhits',
        name: 'Rifles'
    }, {
        key: 'smghits',
        name: 'Sub Machine Gun'
    }, {
        key: 'piehits',
        name: 'Piercing Weapons'
    }, {
        key: 'slahits',
        name: 'Slashing Weapons'
    }, {
        key: 'machits',
        name: 'Machine Guns'
    }, {
        key: 'argtravel',
        name: 'Argentina'
    }, {
        key: 'mextravel',
        name: 'Mexico'
    }, {
        key: 'dubtravel',
        name: 'Dubai'
    }, {
        key: 'hawtravel',
        name: 'Hawaii'
    }, {
        key: 'japtravel',
        name: 'Japan'
    }, {
        key: 'lontravel',
        name: 'United Kingdom'
    }, {
        key: 'soutravel',
        name: 'South Africa'
    }, {
        key: 'switravel',
        name: 'Switzerland'
    }, {
        key: 'chitravel',
        name: 'China'
    }, {
        key: 'cantravel',
        name: 'Canada'
    }, {
        key: 'dumpfinds',
        name: 'Items Found in Dump'
    }, {
        key: 'dumpsearches',
        name: 'Dump Searches'
    }, {
        key: 'itemsdumped',
        name: 'Items Trashed'
    }, {
        key: 'daysbeendonator',
        name: 'Days Been a Donator'
    }, {
        key: 'caytravel',
        name: 'Cayman Islands'
    }, {
        key: 'jailed',
        name: 'Times Jailed'
    }, {
        key: 'hospital',
        name: 'Times in Hospital'
    }, {
        key: 'kettaken',
        name: 'Ketamine Taken'
    }, {
        key: 'shohits',
        name: 'Shotguns'
    }, {
        key: 'opitaken',
        name: 'Opium Taken'
    }, {
        key: 'heahits',
        name: 'Heavy Artillery'
    }, {
        key: 'spetaken',
        name: 'Speed Taken'
    }, {
        key: 'attacksassisted',
        name: 'Attacks Assisted'
    }, {
        key: 'bloodwithdrawn',
        name: 'Blood Withdrawn'
    }, {
        key: 'networth',
        name: 'Networth'
    }, {
        key: 'pcptaken',
        name: 'PCP Taken'
    }, {
        key: 'refills',
        name: 'Refills'
    }, {
        key: 'selling_illegal_products',
        name: 'Selling Illegal Goods'
    }, {
        key: 'theft',
        name: 'Theft'
    }, {
        key: 'auto_theft',
        name: 'Auto Theft'
    }, {
        key: 'drug_deals',
        name: 'Drug Deals'
    }, {
        key: 'computer_crimes',
        name: 'Computer Crimes'
    }, {
        key: 'murder',
        name: 'Murder'
    }, {
        key: 'fraud_crimes',
        name: 'Fraud'
    }, {
        key: 'other',
        name: 'Other'
    }, {
        key: 'total_crimes',
        name: 'Criminal Offences'
    }, {
        key: 'age',
        name: 'Age'
    }, {
        key: 'level',
        name: 'Level'
    }, {
        key: 'karma',
        name: 'Karma'
    }, {
        key: 'forum_posts',
        name: 'Forum Posts'
    }, {
        key: 'friends',
        name: 'Friends'
    }, {
        key: 'enemies',
        name: 'Enemies'
    }, {
        key: 'awards',
        name: 'Awards'
    }, {
        key: 'missionscompleted',
        name: 'Missions Completed'
    }, {
        key: 'missioncreditsearned',
        name: 'Mission Credits Earned'
    }, {
        key: 'contractscompleted',
        name: 'Contracts Completed'
    }, {
        key: 'dukecontractscompleted',
        name: 'Duke Contracts Completed'
    }, {
        key: 'days_married',
        name: 'Days Married'
    }, {
        key: 'spouse_id',
        name: 'Spouse ID'
    }, {
        key: 'spouse_name',
        name: 'Spouse Name'
    }, {
        key: 'job_position',
        name: 'Job Position'
    }, {
        key: 'company_id',
        name: 'Company ID'
    }, {
        key: 'company_name',
        name: 'Company Name'
    }, {
        key: 'killstreak',
        name: 'Current Kill Streak'
    }, {
        key: 'days_in_faction',
        name: 'Days in Faction'
    }, {
        key: 'last_action',
        name: 'Last Action'
    }]
    personalStats.get_by_id = (e) => personalStats.find((ps) => ps.key === e)
    personalStats.get_by_name = (e) => personalStats.find((ps) => ps.name === e)
    
    const items = [
    {
        id: 1,
        name: 'Hammer',
        type: 'Melee'
    }, {
        id: 2,
        name: 'Baseball Bat',
        type: 'Melee'
    }, {
        id: 3,
        name: 'Crow Bar',
        type: 'Melee'
    }, {
        id: 4,
        name: 'Knuckle Dusters',
        type: 'Melee'
    }, {
        id: 5,
        name: 'Pen Knife',
        type: 'Melee'
    }, {
        id: 6,
        name: 'Kitchen Knife',
        type: 'Melee'
    }, {
        id: 7,
        name: 'Dagger',
        type: 'Melee'
    }, {
        id: 8,
        name: 'Axe',
        type: 'Melee'
    }, {
        id: 9,
        name: 'Scimitar',
        type: 'Melee'
    }, {
        id: 10,
        name: 'Chainsaw',
        type: 'Melee'
    }, {
        id: 11,
        name: 'Samurai Sword',
        type: 'Melee'
    }, {
        id: 12,
        name: 'Glock 17',
        type: 'Secondary'
    }, {
        id: 13,
        name: 'Raven MP25',
        type: 'Secondary'
    }, {
        id: 14,
        name: 'Ruger 22/45',
        type: 'Secondary'
    }, {
        id: 15,
        name: 'Beretta M9',
        type: 'Secondary'
    }, {
        id: 16,
        name: 'USP',
        type: 'Secondary'
    }, {
        id: 17,
        name: 'Beretta 92FS',
        type: 'Secondary'
    }, {
        id: 18,
        name: 'Fiveseven',
        type: 'Secondary'
    }, {
        id: 19,
        name: 'Magnum',
        type: 'Secondary'
    }, {
        id: 20,
        name: 'Desert Eagle',
        type: 'Secondary'
    }, {
        id: 21,
        name: 'Dual 92G Berettas',
        type: 'Secondary'
    }, {
        id: 22,
        name: 'Sawed-Off Shotgun',
        type: 'Primary'
    }, {
        id: 23,
        name: 'Benelli M1 Tactical',
        type: 'Primary'
    }, {
        id: 24,
        name: 'MP5 Navy',
        type: 'Primary'
    }, {
        id: 25,
        name: 'P90',
        type: 'Primary'
    }, {
        id: 26,
        name: 'AK-47',
        type: 'Primary'
    }, {
        id: 27,
        name: 'M4A1 Colt Carbine',
        type: 'Primary'
    }, {
        id: 28,
        name: 'Benelli M4 Super',
        type: 'Primary'
    }, {
        id: 29,
        name: 'M16 A2 Rifle',
        type: 'Primary'
    }, {
        id: 30,
        name: 'Steyr AUG',
        type: 'Primary'
    }, {
        id: 31,
        name: 'M249 PARA LMG',
        type: 'Primary'
    }, {
        id: 32,
        name: 'Leather Vest',
        type: 'Defensive'
    }, {
        id: 33,
        name: 'Police Vest',
        type: 'Defensive'
    }, {
        id: 34,
        name: 'Bulletproof Vest',
        type: 'Defensive'
    }, {
        id: 35,
        name: 'Box of Chocolate Bars',
        type: 'Candy'
    }, {
        id: 36,
        name: 'Big Box of Chocolate Bars',
        type: 'Candy'
    }, {
        id: 37,
        name: 'Bag of Bon Bons',
        type: 'Candy'
    }, {
        id: 38,
        name: 'Box of Bon Bons',
        type: 'Candy'
    }, {
        id: 39,
        name: 'Box of Extra Strong Mints',
        type: 'Candy'
    }, {
        id: 40,
        name: 'Pack of Music CDs',
        type: 'Electronic'
    }, {
        id: 41,
        name: 'DVD Player',
        type: 'Electronic'
    }, {
        id: 42,
        name: 'MP3 Player',
        type: 'Electronic'
    }, {
        id: 43,
        name: 'CD Player',
        type: 'Electronic'
    }, {
        id: 44,
        name: 'Pack of Blank CDs',
        type: 'Electronic'
    }, {
        id: 45,
        name: 'Hard Drive',
        type: 'Electronic'
    }, {
        id: 46,
        name: 'Tank Top',
        type: 'Clothing'
    }, {
        id: 47,
        name: 'Pair of Trainers',
        type: 'Clothing'
    }, {
        id: 48,
        name: 'Jacket',
        type: 'Clothing'
    }, {
        id: 49,
        name: 'Full Body Armor',
        type: 'Defensive'
    }, {
        id: 50,
        name: 'Outer Tactical Vest',
        type: 'Defensive'
    }, {
        id: 51,
        name: 'Plain Silver Ring',
        type: 'Jewelry'
    }, {
        id: 52,
        name: 'Sapphire Ring',
        type: 'Jewelry'
    }, {
        id: 53,
        name: 'Gold Ring',
        type: 'Jewelry'
    }, {
        id: 54,
        name: 'Diamond Ring',
        type: 'Jewelry'
    }, {
        id: 55,
        name: 'Pearl Necklace',
        type: 'Jewelry'
    }, {
        id: 56,
        name: 'Silver Necklace',
        type: 'Jewelry'
    }, {
        id: 57,
        name: 'Gold Necklace',
        type: 'Jewelry'
    }, {
        id: 58,
        name: 'Plastic Watch',
        type: 'Jewelry'
    }, {
        id: 59,
        name: 'Stainless Steel Watch',
        type: 'Jewelry'
    }, {
        id: 60,
        name: 'Gold Watch',
        type: 'Jewelry'
    }, {
        id: 61,
        name: 'Personal Computer',
        type: 'Electronic'
    }, {
        id: 62,
        name: 'Microwave',
        type: 'Electronic'
    }, {
        id: 63,
        name: 'Minigun',
        type: 'Primary'
    }, {
        id: 64,
        name: 'Pack of Cuban Cigars',
        type: 'Other'
    }, {
        id: 65,
        name: 'Big TV Screen',
        type: 'Electronic'
    }, {
        id: 66,
        name: 'Morphine',
        type: 'Medical'
    }, {
        id: 67,
        name: 'First Aid Kit',
        type: 'Medical'
    }, {
        id: 68,
        name: 'Small First Aid Kit',
        type: 'Medical'
    }, {
        id: 69,
        name: 'Simple Virus',
        type: 'Virus'
    }, {
        id: 70,
        name: 'Polymorphic Virus',
        type: 'Virus'
    }, {
        id: 71,
        name: 'Tunnelling Virus',
        type: 'Virus'
    }, {
        id: 72,
        name: 'Armored Virus',
        type: 'Virus'
    }, {
        id: 73,
        name: 'Stealth Virus',
        type: 'Virus'
    }, {
        id: 74,
        name: 'Santa Hat \'04',
        type: 'Collectible'
    }, {
        id: 75,
        name: 'Christmas Cracker \'04',
        type: 'Collectible'
    }, {
        id: 76,
        name: 'Snow Cannon',
        type: 'Primary'
    }, {
        id: 77,
        name: 'Toyota MR2',
        type: 'Car'
    }, {
        id: 78,
        name: 'Honda NSX',
        type: 'Car'
    }, {
        id: 79,
        name: 'Audi TT Quattro',
        type: 'Car'
    }, {
        id: 80,
        name: 'BMW M5',
        type: 'Car'
    }, {
        id: 81,
        name: 'BMW Z8',
        type: 'Car'
    }, {
        id: 82,
        name: 'Chevrolet Corvette Z06',
        type: 'Car'
    }, {
        id: 83,
        name: 'Dodge Charger',
        type: 'Car'
    }, {
        id: 84,
        name: 'Firebird',
        type: 'Car'
    }, {
        id: 85,
        name: 'Ford GT40',
        type: 'Car'
    }, {
        id: 86,
        name: 'Hummer H3',
        type: 'Car'
    }, {
        id: 87,
        name: 'Audi S4',
        type: 'Car'
    }, {
        id: 88,
        name: 'Honda Integra R',
        type: 'Car'
    }, {
        id: 89,
        name: 'Honda Accord',
        type: 'Car'
    }, {
        id: 90,
        name: 'Honda Civic',
        type: 'Car'
    }, {
        id: 91,
        name: 'Volkswagen Beetle',
        type: 'Car'
    }, {
        id: 92,
        name: 'Chevrolet Cavalier',
        type: 'Car'
    }, {
        id: 93,
        name: 'Ford Mustang',
        type: 'Car'
    }, {
        id: 94,
        name: 'Reliant Robin',
        type: 'Car'
    }, {
        id: 95,
        name: 'Holden SS',
        type: 'Car'
    }, {
        id: 96,
        name: 'Coat Hanger',
        type: 'Other'
    }, {
        id: 97,
        name: 'Bunch of Flowers',
        type: 'Flower'
    }, {
        id: 98,
        name: 'Neutrilux 2000',
        type: 'Primary'
    }, {
        id: 99,
        name: 'Springfield 1911-A1',
        type: 'Secondary'
    }, {
        id: 100,
        name: 'Egg Propelled Launcher',
        type: 'Primary'
    }, {
        id: 101,
        name: 'Bunny Suit',
        type: 'Clothing'
    }, {
        id: 102,
        name: 'Chocolate Egg \'05',
        type: 'Collectible'
    }, {
        id: 103,
        name: 'Firewalk Virus',
        type: 'Virus'
    }, {
        id: 104,
        name: 'Playstation',
        type: 'Electronic'
    }, {
        id: 105,
        name: 'Xbox',
        type: 'Electronic'
    }, {
        id: 106,
        name: 'Parachute',
        type: 'Booster'
    }, {
        id: 107,
        name: 'Trench Coat',
        type: 'Clothing'
    }, {
        id: 108,
        name: '9mm Uzi',
        type: 'Primary'
    }, {
        id: 109,
        name: 'RPG Launcher',
        type: 'Secondary'
    }, {
        id: 110,
        name: 'Leather Bull Whip',
        type: 'Melee'
    }, {
        id: 111,
        name: 'Ninja Claws',
        type: 'Melee'
    }, {
        id: 112,
        name: 'Test Trophy',
        type: 'Collectible'
    }, {
        id: 113,
        name: 'Pet Rock',
        type: 'Collectible'
    }, {
        id: 114,
        name: 'Non-Anon Doll',
        type: 'Collectible'
    }, {
        id: 115,
        name: 'Poker Doll',
        type: 'Collectible'
    }, {
        id: 116,
        name: 'Yoda Figurine',
        type: 'Collectible'
    }, {
        id: 117,
        name: 'Trojan Horse',
        type: 'Collectible'
    }, {
        id: 118,
        name: 'Evil Doll',
        type: 'Collectible'
    }, {
        id: 119,
        name: 'Rubber Ducky of Doom',
        type: 'Collectible'
    }, {
        id: 120,
        name: 'Teppic Bear',
        type: 'Collectible'
    }, {
        id: 121,
        name: 'RockerHead Doll',
        type: 'Collectible'
    }, {
        id: 122,
        name: 'Mouser Doll',
        type: 'Collectible'
    }, {
        id: 123,
        name: 'Elite Action Man',
        type: 'Collectible'
    }, {
        id: 124,
        name: 'Toy Reactor',
        type: 'Collectible'
    }, {
        id: 125,
        name: 'Royal Doll',
        type: 'Collectible'
    }, {
        id: 126,
        name: 'Blue Dragon',
        type: 'Collectible'
    }, {
        id: 127,
        name: 'China Tea Set',
        type: 'Collectible'
    }, {
        id: 128,
        name: 'Mufasa Toy',
        type: 'Collectible'
    }, {
        id: 129,
        name: 'Dozen Roses',
        type: 'Flower'
    }, {
        id: 130,
        name: 'Skanky Doll',
        type: 'Collectible'
    }, {
        id: 131,
        name: 'Lego Hurin',
        type: 'Collectible'
    }, {
        id: 132,
        name: 'Mystical Sphere',
        type: 'Collectible'
    }, {
        id: 133,
        name: '10 Ton Pacifier',
        type: 'Collectible'
    }, {
        id: 134,
        name: 'Horse',
        type: 'Collectible'
    }, {
        id: 135,
        name: 'Uriel\'s Speakers',
        type: 'Collectible'
    }, {
        id: 136,
        name: 'Strife Clown',
        type: 'Collectible'
    }, {
        id: 137,
        name: 'Locked Teddy',
        type: 'Collectible'
    }, {
        id: 138,
        name: 'Riddle\'s Bat',
        type: 'Collectible'
    }, {
        id: 139,
        name: 'Soup Nazi Doll',
        type: 'Collectible'
    }, {
        id: 140,
        name: 'Pouncer Doll',
        type: 'Collectible'
    }, {
        id: 141,
        name: 'Spammer Doll',
        type: 'Collectible'
    }, {
        id: 142,
        name: 'Cookie Jar',
        type: 'Collectible'
    }, {
        id: 143,
        name: 'Vanity Mirror',
        type: 'Collectible'
    }, {
        id: 144,
        name: 'Banana Phone',
        type: 'Collectible'
    }, {
        id: 145,
        name: 'Xbox 360',
        type: 'Electronic'
    }, {
        id: 146,
        name: 'Yasukuni Sword',
        type: 'Melee'
    }, {
        id: 147,
        name: 'Rusty Sword',
        type: 'Melee'
    }, {
        id: 148,
        name: 'Dance Toy',
        type: 'Collectible'
    }, {
        id: 149,
        name: 'Lucky Dime',
        type: 'Collectible'
    }, {
        id: 150,
        name: 'Crystal Carousel',
        type: 'Collectible'
    }, {
        id: 151,
        name: 'Pixie Sticks',
        type: 'Candy'
    }, {
        id: 152,
        name: 'Ice Sculpture',
        type: 'Collectible'
    }, {
        id: 153,
        name: 'Case of Whiskey',
        type: 'Collectible'
    }, {
        id: 154,
        name: 'Laptop',
        type: 'Electronic'
    }, {
        id: 155,
        name: 'Purple Frog Doll',
        type: 'Collectible'
    }, {
        id: 156,
        name: 'Skeleton Key',
        type: 'Collectible'
    }, {
        id: 157,
        name: 'Patriot Whip',
        type: 'Collectible'
    }, {
        id: 158,
        name: 'Statue Of Aeolus',
        type: 'Collectible'
    }, {
        id: 159,
        name: 'Bolt Cutters',
        type: 'Other'
    }, {
        id: 160,
        name: 'Photographs',
        type: 'Other'
    }, {
        id: 161,
        name: 'Black Unicorn',
        type: 'Collectible'
    }, {
        id: 162,
        name: 'WarPaint Kit',
        type: 'Collectible'
    }, {
        id: 163,
        name: 'Official Ninja Kit',
        type: 'Collectible'
    }, {
        id: 164,
        name: 'Leukaemia TeddyBear',
        type: 'Collectible'
    }, {
        id: 165,
        name: 'Chocobo Flute',
        type: 'Collectible'
    }, {
        id: 166,
        name: 'Annoying Man',
        type: 'Collectible'
    }, {
        id: 167,
        name: 'Article on Crime',
        type: 'Other'
    }, {
        id: 168,
        name: 'Unknown',
        type: 'Unused'
    }, {
        id: 169,
        name: 'Barbie Doll',
        type: 'Collectible'
    }, {
        id: 170,
        name: 'Wand of Destruction',
        type: 'Melee'
    }, {
        id: 171,
        name: 'Jack-O-Lantern \'05',
        type: 'Collectible'
    }, {
        id: 172,
        name: 'Gas Can',
        type: 'Other'
    }, {
        id: 173,
        name: 'Butterfly Knife',
        type: 'Melee'
    }, {
        id: 174,
        name: 'XM8 Rifle',
        type: 'Primary'
    }, {
        id: 175,
        name: 'Taser',
        type: 'Melee'
    }, {
        id: 176,
        name: 'Chain Mail',
        type: 'Defensive'
    }, {
        id: 177,
        name: 'Cobra Derringer',
        type: 'Secondary'
    }, {
        id: 178,
        name: 'Flak Jacket',
        type: 'Defensive'
    }, {
        id: 179,
        name: 'Birthday Cake \'05',
        type: 'Collectible'
    }, {
        id: 180,
        name: 'Bottle of Beer',
        type: 'Alcohol'
    }, {
        id: 181,
        name: 'Bottle of Champagne',
        type: 'Alcohol'
    }, {
        id: 182,
        name: 'Soap on a Rope',
        type: 'Other'
    }, {
        id: 183,
        name: 'Single Red Rose',
        type: 'Flower'
    }, {
        id: 184,
        name: 'Bunch of Black Roses',
        type: 'Flower'
    }, {
        id: 185,
        name: 'Bunch of Balloons \'05',
        type: 'Collectible'
    }, {
        id: 186,
        name: 'Sheep Plushie',
        type: 'Plushie'
    }, {
        id: 187,
        name: 'Teddy Bear Plushie',
        type: 'Plushie'
    }, {
        id: 188,
        name: 'Cracked Crystal Ball',
        type: 'Collectible'
    }, {
        id: 189,
        name: 'S&W Revolver',
        type: 'Secondary'
    }, {
        id: 190,
        name: 'C4 Explosive',
        type: 'Other'
    }, {
        id: 191,
        name: 'Memory Locket',
        type: 'Other'
    }, {
        id: 192,
        name: 'Rainbow Stud Earring',
        type: 'Collectible'
    }, {
        id: 193,
        name: 'Hamster Toy',
        type: 'Collectible'
    }, {
        id: 194,
        name: 'Snowflake \'05',
        type: 'Collectible'
    }, {
        id: 195,
        name: 'Christmas Tree \'05',
        type: 'Collectible'
    }, {
        id: 196,
        name: 'Cannabis',
        type: 'Drug'
    }, {
        id: 197,
        name: 'Ecstasy',
        type: 'Drug'
    }, {
        id: 198,
        name: 'Ketamine',
        type: 'Drug'
    }, {
        id: 199,
        name: 'LSD',
        type: 'Drug'
    }, {
        id: 200,
        name: 'Opium',
        type: 'Drug'
    }, {
        id: 201,
        name: 'PCP',
        type: 'Drug'
    }, {
        id: 202,
        name: 'Mr Torn Crown \'07',
        type: 'Collectible'
    }, {
        id: 203,
        name: 'Shrooms',
        type: 'Drug'
    }, {
        id: 204,
        name: 'Speed',
        type: 'Drug'
    }, {
        id: 205,
        name: 'Vicodin',
        type: 'Drug'
    }, {
        id: 206,
        name: 'Xanax',
        type: 'Drug'
    }, {
        id: 207,
        name: 'Ms Torn Crown \'07',
        type: 'Collectible'
    }, {
        id: 208,
        name: 'Unknown',
        type: 'Unused'
    }, {
        id: 209,
        name: 'Box of Sweet Hearts',
        type: 'Candy'
    }, {
        id: 210,
        name: 'Bag of Chocolate Kisses',
        type: 'Candy'
    }, {
        id: 211,
        name: 'Crazy Cow',
        type: 'Collectible'
    }, {
        id: 212,
        name: 'Legend\'s Urn',
        type: 'Collectible'
    }, {
        id: 213,
        name: 'Dreamcatcher',
        type: 'Collectible'
    }, {
        id: 214,
        name: 'Brutus Keychain',
        type: 'Collectible'
    }, {
        id: 215,
        name: 'Kitten Plushie',
        type: 'Plushie'
    }, {
        id: 216,
        name: 'Single White Rose',
        type: 'Collectible'
    }, {
        id: 217,
        name: 'Claymore Sword',
        type: 'Melee'
    }, {
        id: 218,
        name: 'Crossbow',
        type: 'Secondary'
    }, {
        id: 219,
        name: 'Enfield SA-80',
        type: 'Primary'
    }, {
        id: 220,
        name: 'Grenade',
        type: 'Temporary'
    }, {
        id: 221,
        name: 'Stick Grenade',
        type: 'Temporary'
    }, {
        id: 222,
        name: 'Flash Grenade',
        type: 'Temporary'
    }, {
        id: 223,
        name: 'Jackhammer',
        type: 'Primary'
    }, {
        id: 224,
        name: 'Swiss Army Knife',
        type: 'Melee'
    }, {
        id: 225,
        name: 'Mag 7',
        type: 'Primary'
    }, {
        id: 226,
        name: 'Smoke Grenade',
        type: 'Temporary'
    }, {
        id: 227,
        name: 'Spear',
        type: 'Melee'
    }, {
        id: 228,
        name: 'Vektor CR-21',
        type: 'Primary'
    }, {
        id: 229,
        name: 'Claymore Mine',
        type: 'Temporary'
    }, {
        id: 230,
        name: 'Flare Gun',
        type: 'Secondary'
    }, {
        id: 231,
        name: 'Heckler & Koch SL8',
        type: 'Primary'
    }, {
        id: 232,
        name: 'Sig 550',
        type: 'Primary'
    }, {
        id: 233,
        name: 'BT MP9',
        type: 'Secondary'
    }, {
        id: 234,
        name: 'Chain Whip',
        type: 'Melee'
    }, {
        id: 235,
        name: 'Wooden Nunchakus',
        type: 'Melee'
    }, {
        id: 236,
        name: 'Kama',
        type: 'Melee'
    }, {
        id: 237,
        name: 'Kodachi Swords',
        type: 'Melee'
    }, {
        id: 238,
        name: 'Sai',
        type: 'Melee'
    }, {
        id: 239,
        name: 'Ninja Stars',
        type: 'Temporary'
    }, {
        id: 240,
        name: 'Anti Tank',
        type: 'Primary'
    }, {
        id: 241,
        name: 'Bushmaster Carbon 15 Type 21s',
        type: 'Primary'
    }, {
        id: 242,
        name: 'HEG',
        type: 'Temporary'
    }, {
        id: 243,
        name: 'Taurus',
        type: 'Secondary'
    }, {
        id: 244,
        name: 'Blowgun',
        type: 'Secondary'
    }, {
        id: 245,
        name: 'Bo Staff',
        type: 'Melee'
    }, {
        id: 246,
        name: 'Fireworks',
        type: 'Temporary'
    }, {
        id: 247,
        name: 'Katana',
        type: 'Melee'
    }, {
        id: 248,
        name: 'Qsz-92',
        type: 'Secondary'
    }, {
        id: 249,
        name: 'Sks Carbine',
        type: 'Primary'
    }, {
        id: 250,
        name: 'Twin Tiger Hooks',
        type: 'Melee'
    }, {
        id: 251,
        name: 'Wushu Double Axes',
        type: 'Melee'
    }, {
        id: 252,
        name: 'Ithaca 37',
        type: 'Primary'
    }, {
        id: 253,
        name: 'Lorcin 380',
        type: 'Secondary'
    }, {
        id: 254,
        name: 'S&W M29',
        type: 'Secondary'
    }, {
        id: 255,
        name: 'Flamethrower',
        type: 'Secondary'
    }, {
        id: 256,
        name: 'Tear Gas',
        type: 'Temporary'
    }, {
        id: 257,
        name: 'Throwing Knife',
        type: 'Temporary'
    }, {
        id: 258,
        name: 'Jaguar Plushie',
        type: 'Plushie'
    }, {
        id: 259,
        name: 'Mayan Statue',
        type: 'Other'
    }, {
        id: 260,
        name: 'Dahlia',
        type: 'Flower'
    }, {
        id: 261,
        name: 'Wolverine Plushie',
        type: 'Plushie'
    }, {
        id: 262,
        name: 'Hockey Stick',
        type: 'Other'
    }, {
        id: 263,
        name: 'Crocus',
        type: 'Flower'
    }, {
        id: 264,
        name: 'Orchid',
        type: 'Flower'
    }, {
        id: 265,
        name: 'Pele Charm',
        type: 'Other'
    }, {
        id: 266,
        name: 'Nessie Plushie',
        type: 'Plushie'
    }, {
        id: 267,
        name: 'Heather',
        type: 'Flower'
    }, {
        id: 268,
        name: 'Red Fox Plushie',
        type: 'Plushie'
    }, {
        id: 269,
        name: 'Monkey Plushie',
        type: 'Plushie'
    }, {
        id: 270,
        name: 'Soccer Ball',
        type: 'Other'
    }, {
        id: 271,
        name: 'Ceibo Flower',
        type: 'Flower'
    }, {
        id: 272,
        name: 'Edelweiss',
        type: 'Flower'
    }, {
        id: 273,
        name: 'Chamois Plushie',
        type: 'Plushie'
    }, {
        id: 274,
        name: 'Panda Plushie',
        type: 'Plushie'
    }, {
        id: 275,
        name: 'Jade Buddha',
        type: 'Other'
    }, {
        id: 276,
        name: 'Peony',
        type: 'Flower'
    }, {
        id: 277,
        name: 'Cherry Blossom',
        type: 'Flower'
    }, {
        id: 278,
        name: 'Kabuki Mask',
        type: 'Clothing'
    }, {
        id: 279,
        name: 'Maneki Neko',
        type: 'Other'
    }, {
        id: 280,
        name: 'Elephant Statue',
        type: 'Other'
    }, {
        id: 281,
        name: 'Lion Plushie',
        type: 'Plushie'
    }, {
        id: 282,
        name: 'African Violet',
        type: 'Flower'
    }, {
        id: 283,
        name: 'Donator Pack',
        type: 'Special'
    }, {
        id: 284,
        name: 'Bronze Paint Brush',
        type: 'Collectible'
    }, {
        id: 285,
        name: 'Silver Paint Brush',
        type: 'Collectible'
    }, {
        id: 286,
        name: 'Gold Paint Brush',
        type: 'Collectible'
    }, {
        id: 287,
        name: 'Pand0ra\'s Box',
        type: 'Collectible'
    }, {
        id: 288,
        name: 'Mr Brownstone Doll',
        type: 'Collectible'
    }, {
        id: 289,
        name: 'Dual Axes',
        type: 'Melee'
    }, {
        id: 290,
        name: 'Dual Hammers',
        type: 'Melee'
    }, {
        id: 291,
        name: 'Dual Scimitars',
        type: 'Melee'
    }, {
        id: 292,
        name: 'Dual Samurai Swords',
        type: 'Melee'
    }, {
        id: 293,
        name: 'Japanese/English Dictionary',
        type: 'Other'
    }, {
        id: 294,
        name: 'Bottle of Sake',
        type: 'Alcohol'
    }, {
        id: 295,
        name: 'Oriental Log',
        type: 'Other'
    }, {
        id: 296,
        name: 'Oriental Log Translation',
        type: 'Other'
    }, {
        id: 297,
        name: 'YouYou Yo Yo',
        type: 'Collectible'
    }, {
        id: 298,
        name: 'Monkey Cuffs',
        type: 'Collectible'
    }, {
        id: 299,
        name: 'Jester\'s Cap',
        type: 'Collectible'
    }, {
        id: 300,
        name: 'Gibal\'s Dragonfly',
        type: 'Collectible'
    }, {
        id: 301,
        name: 'Green Ornament',
        type: 'Other'
    }, {
        id: 302,
        name: 'Purple Ornament',
        type: 'Other'
    }, {
        id: 303,
        name: 'Blue Ornament',
        type: 'Other'
    }, {
        id: 304,
        name: 'Purple Bell',
        type: 'Other'
    }, {
        id: 305,
        name: 'Mistletoe',
        type: 'Other'
    }, {
        id: 306,
        name: 'Mini Sleigh',
        type: 'Other'
    }, {
        id: 307,
        name: 'Snowman',
        type: 'Other'
    }, {
        id: 308,
        name: 'Christmas Gnome',
        type: 'Other'
    }, {
        id: 309,
        name: 'Gingerbread House',
        type: 'Other'
    }, {
        id: 310,
        name: 'Lollipop',
        type: 'Candy'
    }, {
        id: 311,
        name: 'Mardi Gras Beads',
        type: 'Collectible'
    }, {
        id: 312,
        name: 'Devil Toy',
        type: 'Collectible'
    }, {
        id: 313,
        name: 'Cookie Launcher',
        type: 'Collectible'
    }, {
        id: 314,
        name: 'Cursed Moon Pendant',
        type: 'Collectible'
    }, {
        id: 315,
        name: 'Apartment Blueprint',
        type: 'Unused'
    }, {
        id: 316,
        name: 'Semi-Detached House Blueprint',
        type: 'Unused'
    }, {
        id: 317,
        name: 'Detached House Blueprint',
        type: 'Unused'
    }, {
        id: 318,
        name: 'Beach House Blueprint',
        type: 'Unused'
    }, {
        id: 319,
        name: 'Chalet Blueprint',
        type: 'Unused'
    }, {
        id: 320,
        name: 'Villa Blueprint',
        type: 'Unused'
    }, {
        id: 321,
        name: 'Penthouse Blueprint',
        type: 'Unused'
    }, {
        id: 322,
        name: 'Mansion Blueprint',
        type: 'Unused'
    }, {
        id: 323,
        name: 'Ranch Blueprint',
        type: 'Unused'
    }, {
        id: 324,
        name: 'Palace Blueprint',
        type: 'Unused'
    }, {
        id: 325,
        name: 'Castle Blueprint',
        type: 'Unused'
    }, {
        id: 326,
        name: 'Printing Paper',
        type: 'Other'
    }, {
        id: 327,
        name: 'Blank Tokens',
        type: 'Other'
    }, {
        id: 328,
        name: 'Blank Credit Cards',
        type: 'Other'
    }, {
        id: 329,
        name: 'Skateboard',
        type: 'Booster'
    }, {
        id: 330,
        name: 'Boxing Gloves',
        type: 'Booster'
    }, {
        id: 331,
        name: 'Dumbbells',
        type: 'Booster'
    }, {
        id: 332,
        name: 'Combat Vest',
        type: 'Defensive'
    }, {
        id: 333,
        name: 'Liquid Body Armor',
        type: 'Defensive'
    }, {
        id: 334,
        name: 'Flexible Body Armor',
        type: 'Defensive'
    }, {
        id: 335,
        name: 'Stick of Dynamite',
        type: 'Other'
    }, {
        id: 336,
        name: 'Cesium-137',
        type: 'Special'
    }, {
        id: 337,
        name: 'Dirty Bomb',
        type: 'Special'
    }, {
        id: 338,
        name: 'Sh0rty\'s Surfboard',
        type: 'Collectible'
    }, {
        id: 339,
        name: 'Puzzle piece',
        type: 'Collectible'
    }, {
        id: 340,
        name: 'Hunny Pot',
        type: 'Collectible'
    }, {
        id: 341,
        name: 'Seductive Stethoscope',
        type: 'Collectible'
    }, {
        id: 342,
        name: 'Dollar Bill Collectible',
        type: 'Collectible'
    }, {
        id: 343,
        name: 'Backstage Pass',
        type: 'Collectible'
    }, {
        id: 344,
        name: 'Chemi\'s Magic Potion',
        type: 'Collectible'
    }, {
        id: 345,
        name: 'Pack of Trojans',
        type: 'Other'
    }, {
        id: 346,
        name: 'Pair of High Heels',
        type: 'Melee'
    }, {
        id: 347,
        name: 'Thong',
        type: 'Clothing'
    }, {
        id: 348,
        name: 'Hazmat Suit',
        type: 'Clothing'
    }, {
        id: 349,
        name: 'Flea Collar',
        type: 'Collectible'
    }, {
        id: 350,
        name: 'Dunkin\'s Donut',
        type: 'Collectible'
    }, {
        id: 351,
        name: 'Amazon Doll',
        type: 'Collectible'
    }, {
        id: 352,
        name: 'BBQ Smoker',
        type: 'Collectible'
    }, {
        id: 353,
        name: 'Bag of Cheetos',
        type: 'Collectible'
    }, {
        id: 354,
        name: 'Motorbike',
        type: 'Collectible'
    }, {
        id: 355,
        name: 'Citrus Squeezer',
        type: 'Collectible'
    }, {
        id: 356,
        name: 'Superman Shades',
        type: 'Collectible'
    }, {
        id: 357,
        name: 'Kevlar Helmet',
        type: 'Collectible'
    }, {
        id: 358,
        name: 'Raw Ivory',
        type: 'Other'
    }, {
        id: 359,
        name: 'Fine Chisel',
        type: 'Melee'
    }, {
        id: 360,
        name: 'Ivory Walking Cane',
        type: 'Melee'
    }, {
        id: 361,
        name: 'Neumune Tablet',
        type: 'Medical'
    }, {
        id: 362,
        name: 'Mr Torn Crown \'08',
        type: 'Collectible'
    }, {
        id: 363,
        name: 'Ms Torn Crown \'08',
        type: 'Collectible'
    }, {
        id: 364,
        name: 'Box of Grenades',
        type: 'Supply Pack'
    }, {
        id: 365,
        name: 'Box of Medical Supplies',
        type: 'Supply Pack'
    }, {
        id: 366,
        name: 'Erotic DVD',
        type: 'Booster'
    }, {
        id: 367,
        name: 'Feathery Hotel Coupon',
        type: 'Booster'
    }, {
        id: 368,
        name: 'Lawyer Business Card',
        type: 'Booster'
    }, {
        id: 369,
        name: 'Lottery Voucher',
        type: 'Supply Pack'
    }, {
        id: 370,
        name: 'Drug Pack',
        type: 'Supply Pack'
    }, {
        id: 371,
        name: 'Dark Doll',
        type: 'Collectible'
    }, {
        id: 372,
        name: 'Empty Box',
        type: 'Other'
    }, {
        id: 373,
        name: 'Parcel',
        type: 'Supply Pack'
    }, {
        id: 374,
        name: 'Birthday Present',
        type: 'Supply Pack'
    }, {
        id: 375,
        name: 'Present',
        type: 'Supply Pack'
    }, {
        id: 376,
        name: 'Christmas Present',
        type: 'Supply Pack'
    }, {
        id: 377,
        name: 'Birthday Wrapping Paper',
        type: 'Other'
    }, {
        id: 378,
        name: 'Generic Wrapping Paper',
        type: 'Other'
    }, {
        id: 379,
        name: 'Christmas Wrapping Paper',
        type: 'Other'
    }, {
        id: 380,
        name: 'Small Explosive Device',
        type: 'Special'
    }, {
        id: 381,
        name: 'Gold Laptop',
        type: 'Electronic'
    }, {
        id: 382,
        name: 'Gold Plated AK-47',
        type: 'Primary'
    }, {
        id: 383,
        name: 'Platinum PDA',
        type: 'Electronic'
    }, {
        id: 384,
        name: 'Camel Plushie',
        type: 'Plushie'
    }, {
        id: 385,
        name: 'Tribulus Omanense',
        type: 'Flower'
    }, {
        id: 386,
        name: 'Sports Sneakers',
        type: 'Enhancer'
    }, {
        id: 387,
        name: 'Handbag',
        type: 'Melee'
    }, {
        id: 388,
        name: 'Pink Mac-10',
        type: 'Primary'
    }, {
        id: 389,
        name: 'Mr Torn Crown \'09',
        type: 'Collectible'
    }, {
        id: 390,
        name: 'Ms Torn Crown \'09',
        type: 'Collectible'
    }, {
        id: 391,
        name: 'Macana',
        type: 'Melee'
    }, {
        id: 392,
        name: 'Pepper Spray',
        type: 'Temporary'
    }, {
        id: 393,
        name: 'Slingshot',
        type: 'Secondary'
    }, {
        id: 394,
        name: 'Brick',
        type: 'Temporary'
    }, {
        id: 395,
        name: 'Metal Nunchakus',
        type: 'Melee'
    }, {
        id: 396,
        name: 'Business Class Ticket',
        type: 'Special'
    }, {
        id: 397,
        name: 'Mace',
        type: 'Melee'
    }, {
        id: 398,
        name: 'Swiss Army SG 550',
        type: 'Primary'
    }, {
        id: 399,
        name: 'ArmaLite M-15A4 Rifle',
        type: 'Primary'
    }, {
        id: 400,
        name: 'Guandao',
        type: 'Melee'
    }, {
        id: 401,
        name: 'Lead Pipe',
        type: 'Melee'
    }, {
        id: 402,
        name: 'Ice Pick',
        type: 'Melee'
    }, {
        id: 403,
        name: 'Box of Tissues',
        type: 'Other'
    }, {
        id: 404,
        name: 'Bandana',
        type: 'Clothing'
    }, {
        id: 405,
        name: 'Loaf of Bread',
        type: 'Other'
    }, {
        id: 406,
        name: 'Afro Comb',
        type: 'Other'
    }, {
        id: 407,
        name: 'Compass',
        type: 'Other'
    }, {
        id: 408,
        name: 'Sextant',
        type: 'Other'
    }, {
        id: 409,
        name: 'Yucca Plant',
        type: 'Other'
    }, {
        id: 410,
        name: 'Fire Hydrant',
        type: 'Other'
    }, {
        id: 411,
        name: 'Model Space Ship',
        type: 'Other'
    }, {
        id: 412,
        name: 'Sports Shades',
        type: 'Clothing'
    }, {
        id: 413,
        name: 'Mountie Hat',
        type: 'Clothing'
    }, {
        id: 414,
        name: 'Proda Sunglasses',
        type: 'Clothing'
    }, {
        id: 415,
        name: 'Ship in a Bottle',
        type: 'Other'
    }, {
        id: 416,
        name: 'Paper Weight',
        type: 'Other'
    }, {
        id: 417,
        name: 'RS232 Cable',
        type: 'Electronic'
    }, {
        id: 418,
        name: 'Tailors Dummy',
        type: 'Other'
    }, {
        id: 419,
        name: 'Small Suitcase',
        type: 'Enhancer'
    }, {
        id: 420,
        name: 'Medium Suitcase',
        type: 'Enhancer'
    }, {
        id: 421,
        name: 'Large Suitcase',
        type: 'Enhancer'
    }, {
        id: 422,
        name: 'Vanity Hand Mirror',
        type: 'Other'
    }, {
        id: 423,
        name: 'Poker Chip',
        type: 'Collectible'
    }, {
        id: 424,
        name: 'Rabbit Foot',
        type: 'Collectible'
    }, {
        id: 425,
        name: 'Voodoo Doll',
        type: 'Collectible'
    }, {
        id: 426,
        name: 'Bottle of Tequila',
        type: 'Alcohol'
    }, {
        id: 427,
        name: 'Sumo Doll',
        type: 'Other'
    }, {
        id: 428,
        name: 'Casino Pass',
        type: 'Special'
    }, {
        id: 429,
        name: 'Chopsticks',
        type: 'Other'
    }, {
        id: 430,
        name: 'Coconut Bra',
        type: 'Clothing'
    }, {
        id: 431,
        name: 'Dart Board',
        type: 'Other'
    }, {
        id: 432,
        name: 'Crazy Straw',
        type: 'Other'
    }, {
        id: 433,
        name: 'Sensu',
        type: 'Other'
    }, {
        id: 434,
        name: 'Yakitori Lantern',
        type: 'Other'
    }, {
        id: 435,
        name: 'Dozen White Roses',
        type: 'Flower'
    }, {
        id: 436,
        name: 'Snowboard',
        type: 'Other'
    }, {
        id: 437,
        name: 'Glow stick',
        type: 'Other'
    }, {
        id: 438,
        name: 'Cricket Bat',
        type: 'Melee'
    }, {
        id: 439,
        name: 'Frying Pan',
        type: 'Melee'
    }, {
        id: 440,
        name: 'Pillow',
        type: 'Melee'
    }, {
        id: 441,
        name: 'Khinkeh P0rnStar Doll',
        type: 'Collectible'
    }, {
        id: 442,
        name: 'Blow-Up Doll',
        type: 'Collectible'
    }, {
        id: 443,
        name: 'Strawberry Milkshake',
        type: 'Collectible'
    }, {
        id: 444,
        name: 'Breadfan Doll',
        type: 'Collectible'
    }, {
        id: 445,
        name: 'Chaos Man',
        type: 'Collectible'
    }, {
        id: 446,
        name: 'Karate Man',
        type: 'Collectible'
    }, {
        id: 447,
        name: 'Burmese Flag',
        type: 'Collectible'
    }, {
        id: 448,
        name: 'Bl0ndie\'s Dictionary',
        type: 'Collectible'
    }, {
        id: 449,
        name: 'Hydroponic Grow Tent',
        type: 'Collectible'
    }, {
        id: 450,
        name: 'Leopard Coin',
        type: 'Artifact'
    }, {
        id: 451,
        name: 'Florin Coin',
        type: 'Artifact'
    }, {
        id: 452,
        name: 'Gold Noble Coin',
        type: 'Artifact'
    }, {
        id: 453,
        name: 'Ganesha Sculpture',
        type: 'Artifact'
    }, {
        id: 454,
        name: 'Vairocana Buddha Sculpture',
        type: 'Artifact'
    }, {
        id: 455,
        name: 'Script from the Quran: Ibn Masud',
        type: 'Artifact'
    }, {
        id: 456,
        name: 'Script from the Quran: Ubay Ibn Kab',
        type: 'Artifact'
    }, {
        id: 457,
        name: 'Script from the Quran: Ali',
        type: 'Artifact'
    }, {
        id: 458,
        name: 'Shabti Sculpture',
        type: 'Artifact'
    }, {
        id: 459,
        name: 'Egyptian Amulet',
        type: 'Artifact'
    }, {
        id: 460,
        name: 'White Senet Pawn',
        type: 'Artifact'
    }, {
        id: 461,
        name: 'Black Senet Pawn',
        type: 'Artifact'
    }, {
        id: 462,
        name: 'Senet Board',
        type: 'Artifact'
    }, {
        id: 463,
        name: 'Epinephrine',
        type: 'Temporary'
    }, {
        id: 464,
        name: 'Melatonin',
        type: 'Temporary'
    }, {
        id: 465,
        name: 'Serotonin',
        type: 'Temporary'
    }, {
        id: 466,
        name: 'Snow Globe \'09',
        type: 'Other'
    }, {
        id: 467,
        name: 'Dancing Santa Claus \'09',
        type: 'Other'
    }, {
        id: 468,
        name: 'Christmas Stocking \'09',
        type: 'Collectible'
    }, {
        id: 469,
        name: 'Santa\'s Elf \'09',
        type: 'Collectible'
    }, {
        id: 470,
        name: 'Christmas Card \'09',
        type: 'Collectible'
    }, {
        id: 471,
        name: 'Admin Portrait \'09',
        type: 'Other'
    }, {
        id: 472,
        name: 'Blue Easter Egg',
        type: 'Candy'
    }, {
        id: 473,
        name: 'Green Easter Egg',
        type: 'Candy'
    }, {
        id: 474,
        name: 'Red Easter Egg',
        type: 'Candy'
    }, {
        id: 475,
        name: 'Yellow Easter Egg',
        type: 'Candy'
    }, {
        id: 476,
        name: 'White Easter Egg',
        type: 'Candy'
    }, {
        id: 477,
        name: 'Black Easter Egg',
        type: 'Candy'
    }, {
        id: 478,
        name: 'Gold Easter Egg',
        type: 'Candy'
    }, {
        id: 479,
        name: 'Metal Dog Tag',
        type: 'Collectible'
    }, {
        id: 480,
        name: 'Bronze Dog Tag',
        type: 'Collectible'
    }, {
        id: 481,
        name: 'Silver Dog Tag',
        type: 'Collectible'
    }, {
        id: 482,
        name: 'Gold Dog Tag',
        type: 'Collectible'
    }, {
        id: 483,
        name: 'MP5k',
        type: 'Primary'
    }, {
        id: 484,
        name: 'AK74u',
        type: 'Primary'
    }, {
        id: 485,
        name: 'Skorpian',
        type: 'Primary'
    }, {
        id: 486,
        name: 'TMP',
        type: 'Primary'
    }, {
        id: 487,
        name: 'Thompson',
        type: 'Primary'
    }, {
        id: 488,
        name: 'MP 40',
        type: 'Primary'
    }, {
        id: 489,
        name: 'Luger',
        type: 'Secondary'
    }, {
        id: 490,
        name: 'Blunderbuss',
        type: 'Secondary'
    }, {
        id: 491,
        name: 'Zombie Brain',
        type: 'Other'
    }, {
        id: 492,
        name: 'Human Head',
        type: 'Other'
    }, {
        id: 493,
        name: 'Medal of Honor',
        type: 'Other'
    }, {
        id: 494,
        name: 'Citroen Saxo',
        type: 'Car'
    }, {
        id: 495,
        name: 'Classic Mini',
        type: 'Car'
    }, {
        id: 496,
        name: 'Fiat Punto',
        type: 'Car'
    }, {
        id: 497,
        name: 'Nissan Micra',
        type: 'Car'
    }, {
        id: 498,
        name: 'Peugeot 106',
        type: 'Car'
    }, {
        id: 499,
        name: 'Renault Clio',
        type: 'Car'
    }, {
        id: 500,
        name: 'Vauxhall Corsa',
        type: 'Car'
    }, {
        id: 501,
        name: 'Volvo 850',
        type: 'Car'
    }, {
        id: 502,
        name: 'Alfa Romeo 156',
        type: 'Car'
    }, {
        id: 503,
        name: 'BMW X5',
        type: 'Car'
    }, {
        id: 504,
        name: 'Seat Leon Cupra',
        type: 'Car'
    }, {
        id: 505,
        name: 'Vauxhall Astra GSI',
        type: 'Car'
    }, {
        id: 506,
        name: 'Volkswagen Golf GTI',
        type: 'Car'
    }, {
        id: 507,
        name: 'Audi S3',
        type: 'Car'
    }, {
        id: 508,
        name: 'Ford Focus RS',
        type: 'Car'
    }, {
        id: 509,
        name: 'Honda S2000',
        type: 'Car'
    }, {
        id: 510,
        name: 'Mini Cooper S',
        type: 'Car'
    }, {
        id: 511,
        name: 'Sierra Cosworth',
        type: 'Car'
    }, {
        id: 512,
        name: 'Lotus Exige',
        type: 'Car'
    }, {
        id: 513,
        name: 'Mitsubishi Evo X',
        type: 'Car'
    }, {
        id: 514,
        name: 'Porsche 911 GT3',
        type: 'Car'
    }, {
        id: 515,
        name: 'Subaru Impreza STI',
        type: 'Car'
    }, {
        id: 516,
        name: 'TVR Sagaris',
        type: 'Car'
    }, {
        id: 517,
        name: 'Aston Martin One-77',
        type: 'Car'
    }, {
        id: 518,
        name: 'Audi R8',
        type: 'Car'
    }, {
        id: 519,
        name: 'Bugatti Veyron',
        type: 'Car'
    }, {
        id: 520,
        name: 'Ferrari 458',
        type: 'Car'
    }, {
        id: 521,
        name: 'Lamborghini Gallardo',
        type: 'Car'
    }, {
        id: 522,
        name: 'Lexus LFA',
        type: 'Car'
    }, {
        id: 523,
        name: 'Mercedes SLR',
        type: 'Car'
    }, {
        id: 524,
        name: 'Nissan GT-R',
        type: 'Car'
    }, {
        id: 525,
        name: 'Mr Torn Crown \'10',
        type: 'Collectible'
    }, {
        id: 526,
        name: 'Ms Torn Crown \'10',
        type: 'Collectible'
    }, {
        id: 527,
        name: 'Bag of Candy Kisses',
        type: 'Candy'
    }, {
        id: 528,
        name: 'Bag of Tootsie Rolls',
        type: 'Candy'
    }, {
        id: 529,
        name: 'Bag of Chocolate Truffles',
        type: 'Candy'
    }, {
        id: 530,
        name: 'Can of Munster',
        type: 'Energy Drink'
    }, {
        id: 531,
        name: 'Bottle of Pumpkin Brew',
        type: 'Alcohol'
    }, {
        id: 532,
        name: 'Can of Red Cow',
        type: 'Energy Drink'
    }, {
        id: 533,
        name: 'Can of Tourine Elite',
        type: 'Energy Drink'
    }, {
        id: 534,
        name: 'Witch\'s Cauldron',
        type: 'Other'
    }, {
        id: 535,
        name: 'Electronic Pumpkin',
        type: 'Other'
    }, {
        id: 536,
        name: 'Jack O Lantern Lamp',
        type: 'Other'
    }, {
        id: 537,
        name: 'Spooky Paper Weight',
        type: 'Other'
    }, {
        id: 538,
        name: 'Medieval Helmet',
        type: 'Defensive'
    }, {
        id: 539,
        name: 'Blood Spattered Sickle',
        type: 'Melee'
    }, {
        id: 540,
        name: 'Cauldron',
        type: 'Other'
    }, {
        id: 541,
        name: 'Bottle of Stinky Swamp Punch',
        type: 'Alcohol'
    }, {
        id: 542,
        name: 'Bottle of Wicked Witch',
        type: 'Alcohol'
    }, {
        id: 543,
        name: 'Deputy Star',
        type: 'Other'
    }, {
        id: 544,
        name: 'Wind Proof Lighter',
        type: 'Enhancer'
    }, {
        id: 545,
        name: 'Dual TMPs',
        type: 'Primary'
    }, {
        id: 546,
        name: 'Dual Bushmasters',
        type: 'Primary'
    }, {
        id: 547,
        name: 'Dual MP5s',
        type: 'Primary'
    }, {
        id: 548,
        name: 'Dual P90s',
        type: 'Primary'
    }, {
        id: 549,
        name: 'Dual Uzis',
        type: 'Primary'
    }, {
        id: 550,
        name: 'Bottle of Kandy Kane',
        type: 'Alcohol'
    }, {
        id: 551,
        name: 'Bottle of Minty Mayhem',
        type: 'Alcohol'
    }, {
        id: 552,
        name: 'Bottle of Mistletoe Madness',
        type: 'Alcohol'
    }, {
        id: 553,
        name: 'Can of Santa Shooters',
        type: 'Energy Drink'
    }, {
        id: 554,
        name: 'Can of Rockstar Rudolph',
        type: 'Energy Drink'
    }, {
        id: 555,
        name: 'Can of X-MASS',
        type: 'Energy Drink'
    }, {
        id: 556,
        name: 'Bag of Reindeer Droppings',
        type: 'Candy'
    }, {
        id: 557,
        name: 'Advent Calendar',
        type: 'Other'
    }, {
        id: 558,
        name: 'Santa\'s Snot',
        type: 'Other'
    }, {
        id: 559,
        name: 'Polar Bear Toy',
        type: 'Other'
    }, {
        id: 560,
        name: 'Fruitcake',
        type: 'Other'
    }, {
        id: 561,
        name: 'Book of Carols',
        type: 'Booster'
    }, {
        id: 562,
        name: 'Sweater',
        type: 'Clothing'
    }, {
        id: 563,
        name: 'Gift Card',
        type: 'Booster'
    }, {
        id: 564,
        name: 'Pair of Glasses',
        type: 'Enhancer'
    }, {
        id: 565,
        name: 'High-Speed DVD Drive',
        type: 'Enhancer'
    }, {
        id: 566,
        name: 'Mountain Bike',
        type: 'Enhancer'
    }, {
        id: 567,
        name: 'Cut-Throat Razor',
        type: 'Enhancer'
    }, {
        id: 568,
        name: 'Slim Crowbar',
        type: 'Enhancer'
    }, {
        id: 569,
        name: 'Balaclava',
        type: 'Enhancer'
    }, {
        id: 570,
        name: 'Advanced Driving Tactics Manual',
        type: 'Enhancer'
    }, {
        id: 571,
        name: 'Ergonomic Keyboard',
        type: 'Enhancer'
    }, {
        id: 572,
        name: 'Tracking Device',
        type: 'Enhancer'
    }, {
        id: 573,
        name: 'Screwdriver',
        type: 'Enhancer'
    }, {
        id: 574,
        name: 'Fanny Pack',
        type: 'Enhancer'
    }, {
        id: 575,
        name: 'Tumble Dryer',
        type: 'Enhancer'
    }, {
        id: 576,
        name: 'Chloroform',
        type: 'Enhancer'
    }, {
        id: 577,
        name: 'Heavy Duty Padlock',
        type: 'Enhancer'
    }, {
        id: 578,
        name: 'Duct Tape',
        type: 'Enhancer'
    }, {
        id: 579,
        name: 'Wireless Dongle',
        type: 'Enhancer'
    }, {
        id: 580,
        name: 'Horse\'s Head',
        type: 'Special'
    }, {
        id: 581,
        name: 'Book',
        type: 'Temporary'
    }, {
        id: 582,
        name: 'Tin Foil Hat',
        type: 'Other'
    }, {
        id: 583,
        name: 'Brown Easter Egg',
        type: 'Candy'
    }, {
        id: 584,
        name: 'Orange Easter Egg',
        type: 'Candy'
    }, {
        id: 585,
        name: 'Pink Easter Egg',
        type: 'Candy'
    }, {
        id: 586,
        name: 'Jawbreaker',
        type: 'Candy'
    }, {
        id: 587,
        name: 'Bag of Sherbet',
        type: 'Candy'
    }, {
        id: 588,
        name: 'Goodie Bag',
        type: 'Supply Pack'
    }, {
        id: 589,
        name: 'Undefined',
        type: 'Unused'
    }, {
        id: 590,
        name: 'Undefined 2',
        type: 'Unused'
    }, {
        id: 591,
        name: 'Undefined 3',
        type: 'Unused'
    }, {
        id: 592,
        name: 'Undefined 4',
        type: 'Unused'
    }, {
        id: 593,
        name: 'Mr Torn Crown \'11',
        type: 'Collectible'
    }, {
        id: 594,
        name: 'Ms Torn Crown \'11',
        type: 'Collectible'
    }, {
        id: 595,
        name: 'Pile of Vomit',
        type: 'Other'
    }, {
        id: 596,
        name: 'Rusty Dog Tag',
        type: 'Other'
    }, {
        id: 597,
        name: 'Gold Nugget',
        type: 'Other'
    }, {
        id: 598,
        name: 'Witch\'s Hat',
        type: 'Clothing'
    }, {
        id: 599,
        name: 'Golden Broomstick',
        type: 'Melee'
    }, {
        id: 600,
        name: 'Devil\'s Pitchfork',
        type: 'Melee'
    }, {
        id: 601,
        name: 'Christmas Lights',
        type: 'Other'
    }, {
        id: 602,
        name: 'Gingerbread Man',
        type: 'Other'
    }, {
        id: 603,
        name: 'Golden Wreath',
        type: 'Other'
    }, {
        id: 604,
        name: 'Pair of Ice Skates',
        type: 'Melee'
    }, {
        id: 605,
        name: 'Diamond Icicle',
        type: 'Melee'
    }, {
        id: 606,
        name: 'Santa Boots',
        type: 'Clothing'
    }, {
        id: 607,
        name: 'Santa Gloves',
        type: 'Clothing'
    }, {
        id: 608,
        name: 'Santa Hat',
        type: 'Clothing'
    }, {
        id: 609,
        name: 'Santa Jacket',
        type: 'Clothing'
    }, {
        id: 610,
        name: 'Santa Trousers',
        type: 'Clothing'
    }, {
        id: 611,
        name: 'Snowball',
        type: 'Temporary'
    }, {
        id: 612,
        name: 'Tavor TAR-21',
        type: 'Primary'
    }, {
        id: 613,
        name: 'Harpoon',
        type: 'Secondary'
    }, {
        id: 614,
        name: 'Diamond Bladed Knife',
        type: 'Melee'
    }, {
        id: 615,
        name: 'Naval Cutlass Sword',
        type: 'Melee'
    }, {
        id: 616,
        name: 'Trout',
        type: 'Temporary'
    }, {
        id: 617,
        name: 'Banana Orchid',
        type: 'Flower'
    }, {
        id: 618,
        name: 'Stingray Plushie',
        type: 'Plushie'
    }, {
        id: 619,
        name: 'Steel Drum',
        type: 'Other'
    }, {
        id: 620,
        name: 'Nodding Turtle',
        type: 'Other'
    }, {
        id: 621,
        name: 'Snorkel',
        type: 'Clothing'
    }, {
        id: 622,
        name: 'Flippers',
        type: 'Clothing'
    }, {
        id: 623,
        name: 'Speedo',
        type: 'Clothing'
    }, {
        id: 624,
        name: 'Bikini',
        type: 'Clothing'
    }, {
        id: 625,
        name: 'Wetsuit',
        type: 'Clothing'
    }, {
        id: 626,
        name: 'Diving Gloves',
        type: 'Clothing'
    }, {
        id: 627,
        name: 'Dog Poop',
        type: 'Special'
    }, {
        id: 628,
        name: 'Stink Bombs',
        type: 'Special'
    }, {
        id: 629,
        name: 'Toilet Paper',
        type: 'Special'
    }, {
        id: 630,
        name: 'Mr Torn Crown \'12',
        type: 'Collectible'
    }, {
        id: 631,
        name: 'Ms Torn Crown \'12',
        type: 'Collectible'
    }, {
        id: 632,
        name: 'Petrified Humerus',
        type: 'Melee'
    }, {
        id: 633,
        name: 'Latex Gloves',
        type: 'Clothing'
    }, {
        id: 634,
        name: 'Bag of Bloody Eyeballs',
        type: 'Candy'
    }, {
        id: 635,
        name: 'Straitjacket',
        type: 'Clothing'
    }, {
        id: 636,
        name: 'Cinnamon Ornament',
        type: 'Other'
    }, {
        id: 637,
        name: 'Christmas Express',
        type: 'Other'
    }, {
        id: 638,
        name: 'Bottle of Christmas Cocktail',
        type: 'Alcohol'
    }, {
        id: 639,
        name: 'Golden Candy Cane',
        type: 'Other'
    }, {
        id: 640,
        name: 'Kevlar Gloves',
        type: 'Defensive'
    }, {
        id: 641,
        name: 'WWII Helmet',
        type: 'Defensive'
    }, {
        id: 642,
        name: 'Motorcycle Helmet',
        type: 'Defensive'
    }, {
        id: 643,
        name: 'Construction Helmet',
        type: 'Defensive'
    }, {
        id: 644,
        name: 'Welding Helmet',
        type: 'Defensive'
    }, {
        id: 645,
        name: 'Safety Boots',
        type: 'Defensive'
    }, {
        id: 646,
        name: 'Hiking Boots',
        type: 'Defensive'
    }, {
        id: 647,
        name: 'Leather Helmet',
        type: 'Defensive'
    }, {
        id: 648,
        name: 'Leather Pants',
        type: 'Defensive'
    }, {
        id: 649,
        name: 'Leather Boots',
        type: 'Defensive'
    }, {
        id: 650,
        name: 'Leather Gloves',
        type: 'Defensive'
    }, {
        id: 651,
        name: 'Combat Helmet',
        type: 'Defensive'
    }, {
        id: 652,
        name: 'Combat Pants',
        type: 'Defensive'
    }, {
        id: 653,
        name: 'Combat Boots',
        type: 'Defensive'
    }, {
        id: 654,
        name: 'Combat Gloves',
        type: 'Defensive'
    }, {
        id: 655,
        name: 'Riot Helmet',
        type: 'Defensive'
    }, {
        id: 656,
        name: 'Riot Body',
        type: 'Defensive'
    }, {
        id: 657,
        name: 'Riot Pants',
        type: 'Defensive'
    }, {
        id: 658,
        name: 'Riot Boots',
        type: 'Defensive'
    }, {
        id: 659,
        name: 'Riot Gloves',
        type: 'Defensive'
    }, {
        id: 660,
        name: 'Dune Helmet',
        type: 'Defensive'
    }, {
        id: 661,
        name: 'Dune Body',
        type: 'Defensive'
    }, {
        id: 662,
        name: 'Dune Pants',
        type: 'Defensive'
    }, {
        id: 663,
        name: 'Dune Boots',
        type: 'Defensive'
    }, {
        id: 664,
        name: 'Dune Gloves',
        type: 'Defensive'
    }, {
        id: 665,
        name: 'Assault Helmet',
        type: 'Defensive'
    }, {
        id: 666,
        name: 'Assault Body',
        type: 'Defensive'
    }, {
        id: 667,
        name: 'Assault Pants',
        type: 'Defensive'
    }, {
        id: 668,
        name: 'Assault Boots',
        type: 'Defensive'
    }, {
        id: 669,
        name: 'Assault Gloves',
        type: 'Defensive'
    }, {
        id: 670,
        name: 'Delta Gas Mask',
        type: 'Defensive'
    }, {
        id: 671,
        name: 'Delta Body',
        type: 'Defensive'
    }, {
        id: 672,
        name: 'Delta Pants',
        type: 'Defensive'
    }, {
        id: 673,
        name: 'Delta Boots',
        type: 'Defensive'
    }, {
        id: 674,
        name: 'Delta Gloves',
        type: 'Defensive'
    }, {
        id: 675,
        name: 'Marauder Face Mask',
        type: 'Defensive'
    }, {
        id: 676,
        name: 'Marauder Body',
        type: 'Defensive'
    }, {
        id: 677,
        name: 'Marauder Pants',
        type: 'Defensive'
    }, {
        id: 678,
        name: 'Marauder Boots',
        type: 'Defensive'
    }, {
        id: 679,
        name: 'Marauder Gloves',
        type: 'Defensive'
    }, {
        id: 680,
        name: 'EOD Helmet',
        type: 'Defensive'
    }, {
        id: 681,
        name: 'EOD Apron',
        type: 'Defensive'
    }, {
        id: 682,
        name: 'EOD Pants',
        type: 'Defensive'
    }, {
        id: 683,
        name: 'EOD Boots',
        type: 'Defensive'
    }, {
        id: 684,
        name: 'EOD Gloves',
        type: 'Defensive'
    }, {
        id: 685,
        name: 'Torn Bible',
        type: 'Collectible'
    }, {
        id: 686,
        name: 'Friendly Bot Guide',
        type: 'Collectible'
    }, {
        id: 687,
        name: 'Egotistical Bear',
        type: 'Collectible'
    }, {
        id: 688,
        name: 'Brewery Key',
        type: 'Collectible'
    }, {
        id: 689,
        name: 'Signed Jersey',
        type: 'Collectible'
    }, {
        id: 690,
        name: 'Mafia Kit',
        type: 'Collectible'
    }, {
        id: 691,
        name: 'Octopus Toy',
        type: 'Collectible'
    }, {
        id: 692,
        name: 'Bear Skin Rug',
        type: 'Collectible'
    }, {
        id: 693,
        name: 'Tractor Toy',
        type: 'Collectible'
    }, {
        id: 694,
        name: 'Mr Torn Crown \'13',
        type: 'Collectible'
    }, {
        id: 695,
        name: 'Ms Torn Crown \'13',
        type: 'Collectible'
    }, {
        id: 696,
        name: 'Piece of Cake',
        type: 'Other'
    }, {
        id: 697,
        name: 'Rotten Eggs',
        type: 'Other'
    }, {
        id: 698,
        name: 'Peg Leg',
        type: 'Other'
    }, {
        id: 699,
        name: 'Antidote',
        type: 'Medical'
    }, {
        id: 700,
        name: 'Christmas Angel',
        type: 'Other'
    }, {
        id: 701,
        name: 'Eggnog',
        type: 'Other'
    }, {
        id: 702,
        name: 'Sprig of Holly',
        type: 'Other'
    }, {
        id: 703,
        name: 'Festive Socks',
        type: 'Clothing'
    }, {
        id: 704,
        name: 'Respo Hoodie',
        type: 'Clothing'
    }, {
        id: 705,
        name: 'Staff Haxx Button',
        type: 'Other'
    }, {
        id: 706,
        name: 'Birthday Cake \'14',
        type: 'Other'
    }, {
        id: 707,
        name: 'Lump of Coal',
        type: 'Other'
    }, {
        id: 708,
        name: 'Gold Ribbon',
        type: 'Collectible'
    }, {
        id: 709,
        name: 'Silver Ribbon',
        type: 'Collectible'
    }, {
        id: 710,
        name: 'Bronze Ribbon',
        type: 'Collectible'
    }, {
        id: 711,
        name: 'Coin : Factions',
        type: 'Collectible'
    }, {
        id: 712,
        name: 'Coin : Casino',
        type: 'Collectible'
    }, {
        id: 713,
        name: 'Coin : Education',
        type: 'Collectible'
    }, {
        id: 714,
        name: 'Coin : Hospital',
        type: 'Collectible'
    }, {
        id: 715,
        name: 'Coin : Jail',
        type: 'Collectible'
    }, {
        id: 716,
        name: 'Coin : Travel Agency',
        type: 'Collectible'
    }, {
        id: 717,
        name: 'Coin : Companies',
        type: 'Collectible'
    }, {
        id: 718,
        name: 'Coin : Stock Exchange',
        type: 'Collectible'
    }, {
        id: 719,
        name: 'Coin : Church',
        type: 'Collectible'
    }, {
        id: 720,
        name: 'Coin : Auction House',
        type: 'Collectible'
    }, {
        id: 721,
        name: 'Coin : Race Track',
        type: 'Collectible'
    }, {
        id: 722,
        name: 'Coin : Museum',
        type: 'Collectible'
    }, {
        id: 723,
        name: 'Coin : Drugs',
        type: 'Collectible'
    }, {
        id: 724,
        name: 'Coin : Dump',
        type: 'Collectible'
    }, {
        id: 725,
        name: 'Coin : Estate Agents',
        type: 'Collectible'
    }, {
        id: 726,
        name: 'Scrooge\'s Top Hat',
        type: 'Clothing'
    }, {
        id: 727,
        name: 'Scrooge\'s Topcoat',
        type: 'Clothing'
    }, {
        id: 728,
        name: 'Scrooge\'s Trousers',
        type: 'Clothing'
    }, {
        id: 729,
        name: 'Scrooge\'s Boots',
        type: 'Clothing'
    }, {
        id: 730,
        name: 'Scrooge\'s Gloves',
        type: 'Clothing'
    }, {
        id: 731,
        name: 'Empty Blood Bag',
        type: 'Medical'
    }, {
        id: 732,
        name: 'Blood Bag : A+',
        type: 'Medical'
    }, {
        id: 733,
        name: 'Blood Bag : A-',
        type: 'Medical'
    }, {
        id: 734,
        name: 'Blood Bag : B+',
        type: 'Medical'
    }, {
        id: 735,
        name: 'Blood Bag : B-',
        type: 'Medical'
    }, {
        id: 736,
        name: 'Blood Bag : AB+',
        type: 'Medical'
    }, {
        id: 737,
        name: 'Blood Bag : AB-',
        type: 'Medical'
    }, {
        id: 738,
        name: 'Blood Bag : O+',
        type: 'Medical'
    }, {
        id: 739,
        name: 'Blood Bag : O-',
        type: 'Medical'
    }, {
        id: 740,
        name: 'Mr Torn Crown',
        type: 'Collectible'
    }, {
        id: 741,
        name: 'Ms Torn Crown',
        type: 'Collectible'
    }, {
        id: 742,
        name: 'Molotov Cocktail',
        type: 'Temporary'
    }, {
        id: 743,
        name: 'Christmas Sweater \'15',
        type: 'Clothing'
    }, {
        id: 744,
        name: 'Book : Brawn Over Brains',
        type: 'Book'
    }, {
        id: 745,
        name: 'Book : Time Is In The Mind',
        type: 'Book'
    }, {
        id: 746,
        name: 'Book : Keeping Your Face Handsome',
        type: 'Book'
    }, {
        id: 747,
        name: 'Book : A Job For Your Hands',
        type: 'Book'
    }, {
        id: 748,
        name: 'Book : Working 9 Til 5',
        type: 'Book'
    }, {
        id: 749,
        name: 'Book : Making Friends, Enemies, And Cakes',
        type: 'Book'
    }, {
        id: 750,
        name: 'Book : High School For Adults',
        type: 'Book'
    }, {
        id: 751,
        name: 'Book : Milk Yourself Sober',
        type: 'Book'
    }, {
        id: 752,
        name: 'Book : Fight Like An Asshole',
        type: 'Book'
    }, {
        id: 753,
        name: 'Book : Mind Over Matter',
        type: 'Book'
    }, {
        id: 754,
        name: 'Book : No Shame No Pain',
        type: 'Book'
    }, {
        id: 755,
        name: 'Book : Run Like The Wind',
        type: 'Book'
    }, {
        id: 756,
        name: 'Book : Weaseling Out Of Trouble',
        type: 'Book'
    }, {
        id: 757,
        name: 'Book : Get Hard Or Go Home',
        type: 'Book'
    }, {
        id: 758,
        name: 'Book : Gym Grunting - Shouting To Success',
        type: 'Book'
    }, {
        id: 759,
        name: 'Book : Self Defense In The Workplace',
        type: 'Book'
    }, {
        id: 760,
        name: 'Book : Speed 3 - The Rejected Script',
        type: 'Book'
    }, {
        id: 761,
        name: 'Book : Limbo Lovers 101',
        type: 'Book'
    }, {
        id: 762,
        name: 'Book : The Hamburglar\'s Guide To Crime',
        type: 'Book'
    }, {
        id: 763,
        name: 'Book : What Are Old Folk Good For Anyway?',
        type: 'Book'
    }, {
        id: 764,
        name: 'Book : Medical Degree Schmedical Degree',
        type: 'Book'
    }, {
        id: 765,
        name: 'Book : No More Soap On A Rope',
        type: 'Book'
    }, {
        id: 766,
        name: 'Book : Mailing Yourself Abroad',
        type: 'Book'
    }, {
        id: 767,
        name: 'Book : Smuggling For Beginners',
        type: 'Book'
    }, {
        id: 768,
        name: 'Book : Stealthy Stealing of Underwear',
        type: 'Book'
    }, {
        id: 769,
        name: 'Book : Shawshank Sure Ain\'t For Me!',
        type: 'Book'
    }, {
        id: 770,
        name: 'Book : Ignorance Is Bliss',
        type: 'Book'
    }, {
        id: 771,
        name: 'Book : Winking To Win',
        type: 'Book'
    }, {
        id: 772,
        name: 'Book : Finders Keepers',
        type: 'Book'
    }, {
        id: 773,
        name: 'Book : Hot Turkey',
        type: 'Book'
    }, {
        id: 774,
        name: 'Book : Higher Daddy, Higher!',
        type: 'Book'
    }, {
        id: 775,
        name: 'Book : The Real Dutch Courage',
        type: 'Book'
    }, {
        id: 776,
        name: 'Book : Because I\'m Happy - The Pharrell Story',
        type: 'Book'
    }, {
        id: 777,
        name: 'Book : No More Sick Days',
        type: 'Book'
    }, {
        id: 778,
        name: 'Book : Duke - My Story',
        type: 'Book'
    }, {
        id: 779,
        name: 'Book : Self Control Is For Losers',
        type: 'Book'
    }, {
        id: 780,
        name: 'Book : Going Back For More',
        type: 'Book'
    }, {
        id: 781,
        name: 'Book : Get Drunk And Lose Dignity',
        type: 'Book'
    }, {
        id: 782,
        name: 'Book : Fuelling Your Way To Failure',
        type: 'Book'
    }, {
        id: 783,
        name: 'Book : Yes Please Diabetes',
        type: 'Book'
    }, {
        id: 784,
        name: 'Book : Ugly Energy',
        type: 'Book'
    }, {
        id: 785,
        name: 'Book : Memories And Mammaries',
        type: 'Book'
    }, {
        id: 786,
        name: 'Book : Brown-nosing The Boss',
        type: 'Book'
    }, {
        id: 787,
        name: 'Book : Running Away From Trouble',
        type: 'Book'
    }, {
        id: 788,
        name: 'Certificate of Awesome',
        type: 'Other'
    }, {
        id: 789,
        name: 'Certificate of Lame',
        type: 'Other'
    }, {
        id: 790,
        name: 'Plastic Sword',
        type: 'Melee'
    }, {
        id: 791,
        name: 'Mediocre T-Shirt',
        type: 'Clothing'
    }, {
        id: 792,
        name: 'Penelope',
        type: 'Melee'
    }, {
        id: 793,
        name: 'Cake Frosting',
        type: 'Other'
    }, {
        id: 794,
        name: 'Lock Picking Kit',
        type: 'Other'
    }, {
        id: 795,
        name: 'Special Fruitcake',
        type: 'Other'
    }, {
        id: 796,
        name: 'Felovax',
        type: 'Medical'
    }, {
        id: 797,
        name: 'Zylkene',
        type: 'Medical'
    }, {
        id: 798,
        name: 'Duke\'s Safe',
        type: 'Other'
    }, {
        id: 799,
        name: 'Duke\'s Selfies',
        type: 'Other'
    }, {
        id: 800,
        name: 'Duke\'s Poetry',
        type: 'Other'
    }, {
        id: 801,
        name: 'Duke\'s Dog\'s Ashes',
        type: 'Other'
    }, {
        id: 802,
        name: 'Duke\'s Will',
        type: 'Other'
    }, {
        id: 803,
        name: 'Duke\'s Gimp Mask',
        type: 'Clothing'
    }, {
        id: 804,
        name: 'Duke\'s Herpes Medication',
        type: 'Medical'
    }, {
        id: 805,
        name: 'Duke\'s Hammer',
        type: 'Melee'
    }, {
        id: 806,
        name: 'Old Lady Mask',
        type: 'Clothing'
    }, {
        id: 807,
        name: 'Exotic Gentleman Mask',
        type: 'Clothing'
    }, {
        id: 808,
        name: 'Ginger Kid Mask',
        type: 'Clothing'
    }, {
        id: 809,
        name: 'Young Lady Mask',
        type: 'Clothing'
    }, {
        id: 810,
        name: 'Moustache Man Mask',
        type: 'Clothing'
    }, {
        id: 811,
        name: 'Scarred Man Mask',
        type: 'Clothing'
    }, {
        id: 812,
        name: 'Psycho Clown Mask',
        type: 'Clothing'
    }, {
        id: 813,
        name: 'Nun Mask',
        type: 'Clothing'
    }, {
        id: 814,
        name: 'Tyrosine',
        type: 'Temporary'
    }, {
        id: 815,
        name: 'Keg of Beer',
        type: 'Supply Pack'
    }, {
        id: 816,
        name: 'Glass of Beer',
        type: 'Alcohol'
    }, {
        id: 817,
        name: 'Six Pack of Alcohol',
        type: 'Supply Pack'
    }, {
        id: 818,
        name: 'Six Pack of Energy Drink',
        type: 'Supply Pack'
    }, {
        id: 819,
        name: 'Rosary Beads',
        type: 'Enhancer'
    }, {
        id: 820,
        name: 'Piggy Bank',
        type: 'Special'
    }, {
        id: 821,
        name: 'Empty Vial',
        type: 'Other'
    }, {
        id: 822,
        name: 'Vial of Blood',
        type: 'Other'
    }, {
        id: 823,
        name: 'Vial of Urine',
        type: 'Other'
    }, {
        id: 824,
        name: 'Vial of Saliva',
        type: 'Other'
    }, {
        id: 825,
        name: 'Questionnaire ',
        type: 'Other'
    }, {
        id: 826,
        name: 'Agreement',
        type: 'Other'
    }, {
        id: 827,
        name: 'Perceptron : Calibrator',
        type: 'Electronic'
    }, {
        id: 828,
        name: 'Donald Trump Mask \'16',
        type: 'Clothing'
    }, {
        id: 829,
        name: 'Yellow Snowman \'16',
        type: 'Collectible'
    }, {
        id: 830,
        name: 'Nock Gun',
        type: 'Primary'
    }, {
        id: 831,
        name: 'Beretta Pico',
        type: 'Secondary'
    }, {
        id: 832,
        name: 'Riding Crop',
        type: 'Melee'
    }, {
        id: 833,
        name: 'Sand',
        type: 'Temporary'
    }, {
        id: 834,
        name: 'Sweatpants',
        type: 'Clothing'
    }, {
        id: 835,
        name: 'String Vest',
        type: 'Clothing'
    }, {
        id: 836,
        name: 'Black Oxfords',
        type: 'Clothing'
    }, {
        id: 837,
        name: 'Rheinmetall MG 3',
        type: 'Primary'
    }, {
        id: 838,
        name: 'Homemade Pocket Shotgun',
        type: 'Secondary'
    }, {
        id: 839,
        name: 'Madball',
        type: 'Melee'
    }, {
        id: 840,
        name: 'Nail Bomb',
        type: 'Temporary'
    }, {
        id: 841,
        name: 'Classic Fedora',
        type: 'Clothing'
    }, {
        id: 842,
        name: 'Pinstripe Suit Trousers',
        type: 'Clothing'
    }, {
        id: 843,
        name: 'Duster',
        type: 'Clothing'
    }, {
        id: 844,
        name: 'Tranquilizer Gun ',
        type: 'Secondary'
    }, {
        id: 845,
        name: 'Bolt Gun',
        type: 'Melee'
    }, {
        id: 846,
        name: 'Scalpel',
        type: 'Melee'
    }, {
        id: 847,
        name: 'Nerve Gas',
        type: 'Temporary'
    }, {
        id: 848,
        name: 'Kevlar Lab Coat',
        type: 'Defensive'
    }, {
        id: 849,
        name: 'Loupes',
        type: 'Clothing'
    }, {
        id: 850,
        name: 'Sledgehammer',
        type: 'Melee'
    }, {
        id: 851,
        name: 'Wifebeater',
        type: 'Clothing'
    }, {
        id: 852,
        name: 'Metal Detector',
        type: 'Electronic'
    }, {
        id: 853,
        name: 'Graveyard Key',
        type: 'Collectible'
    }, {
        id: 854,
        name: 'Questionnaire : Completed',
        type: 'Other'
    }, {
        id: 855,
        name: 'Agreement : Signed',
        type: 'Other'
    }, {
        id: 856,
        name: 'Spray Can : Black',
        type: 'Collectible'
    }, {
        id: 857,
        name: 'Spray Can : Red',
        type: 'Collectible'
    }, {
        id: 858,
        name: 'Spray Can : Pink',
        type: 'Collectible'
    }, {
        id: 859,
        name: 'Spray Can : Purple',
        type: 'Collectible'
    }, {
        id: 860,
        name: 'Spray Can : Blue',
        type: 'Collectible'
    }, {
        id: 861,
        name: 'Spray Can : Green',
        type: 'Collectible'
    }, {
        id: 862,
        name: 'Spray Can : Yellow',
        type: 'Collectible'
    }, {
        id: 863,
        name: 'Spray Can : Orange',
        type: 'Collectible'
    }, {
        id: 864,
        name: 'Salt Shaker',
        type: 'Other'
    }, {
        id: 865,
        name: 'Poison Mistletoe',
        type: 'Special'
    }, {
        id: 866,
        name: 'Santa\'s List \'17',
        type: 'Collectible'
    }, {
        id: 867,
        name: 'Soapbox',
        type: 'Collectible'
    }, {
        id: 868,
        name: 'Turkey Baster',
        type: 'Other'
    }, {
        id: 869,
        name: 'Elon Musk Mask \'17',
        type: 'Clothing'
    }, {
        id: 870,
        name: 'Love Juice',
        type: 'Drug'
    }, {
        id: 871,
        name: 'Bug Swatter',
        type: 'Melee'
    }, {
        id: 872,
        name: 'Nothing',
        type: 'Other'
    }];

    items.get_by_id = (e) => items.find((i) => i.id === e)

    return {
        Widget : (options) => {

            var containerMain = createElement('div');
            containerMain.classList.add('my-width100');
        
            var logo = createElement('span');
            logo.innerHTML = 'TornEXT';
            logo.style.fontWeight = 600;
            logo.classList.add('my-margin-right10');
            logo.style.color = '#07F';
        
            var title = createElement('div');
            //title.classList.add('title');
            title.classList.add('title-black');
            title.classList.add('top-round');
            //if(options && options.active){title.classList.add('active')};
            title.classList.add('my-widget-title');
            
        
            appendChild(title, logo);
            
            var titleDiv = createElement('div');
            titleDiv.classList.add('my-width100');
            titleDiv.classList.add('my-margin-right10');

            var titleSpan = createElement('span');
        
            appendChild(titleDiv, titleSpan);
            appendChild(title, titleDiv);
        
            if(options && options.title){
                titleSpan.classList.add('my-variable-text');
                titleSpan.setAttribute('data-textbig', options.title);
                titleSpan.setAttribute('data-textsmall', options.title_small ? options.title_small : '');
            };

            if(options && options.colapsable){

                titleDiv.addEventListener('click', function(e){
                    
                    if(this == e.target){
                        
                        var title = this.parentNode;
                        var content = title.parentNode.querySelector('.widget-container');
            
                        //title.classList.toggle('active');
                        content.classList.toggle('my-hide');

                        var isCollapsed = content.classList.contains('my-hide');

                        if(options.toggleCallback && typeof options.toggleCallback === 'function'){options.toggleCallback(isCollapsed);}
                    }

                    //e.preventDefault();
                });
            }
        
            var container = createElement('div');
            container.classList.add('bottom-round');
            container.classList.add('widget-container');
            container.classList.add('my-container');
            if(options && options.colapsed){container.classList.add('my-hide');}
        
            var body = createElement('div');
            body.classList.add('bottom-round');
            body.classList.add('widget-body');
            if(options && options.flex){body.classList.add('my-flex-container');}
            var footer = createElement('div');
            footer.classList.add('bottom-round');
            footer.classList.add('my-footer');
            footer.classList.add('widget-footer');
        
            appendChild(containerMain, title);
            appendChild(container, body);
            appendChild(container, footer);
            appendChild(containerMain, container);
        
            return {
                container: containerMain,
                title: titleSpan,
                header: titleDiv,
                body: body,
                footer: footer,
                toggleContainer: container
            }
        },

        items : items,

        personalStats : personalStats,

        crimeGroups : crimeGroups,

        crimes : crimes,

        ajaxComplete : undefined
    }
})();

/*
(function(){
    var isChrome = false;
    if(typeof browser === 'undefined' || browser === null){isChrome = true};

    var factionRegex = /^.*factions\.php.*$/;
    
    //debugger;

    if(factionRegex.test(window.location.href)){
        if(isChrome){
            chrome.runtime.sendMessage({msg: "factionUpgrades"});
        }
        else{
            browser.runtime.sendMessage({msg: "factionUpgrades"});
        }
    }
    
})();
*/