const graphql = require('graphql');
const sequelize = require('../database/mysql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = graphql;

const HotelsMongo = require('../models/hotelsMongo');
const HotelsMysql = require('../models/hotelsMysql');
const FacilitiesType =  new GraphQLObjectType({
    name: 'Facilities',
    fields: () => ({
        title: { type: GraphQLString },
    })
})
const ThemesType =  new GraphQLObjectType({
    name: 'Themes',
    fields: () => ({
        title: { type: GraphQLString },
    })
})
const HotelType =  new GraphQLObjectType({
    name: 'Hotels',
    fields: () => ({
        name: { type: GraphQLString },
        star: { type: GraphQLString },
        country_code: {
            type: GraphQLString,
            resolve(parent, args){
                str = parent.country_code;
                return str.toUpperCase();   
            }
        },
        country_name: { type: GraphQLString },
        destination : { type: GraphQLString } ,
        destination_latitude : { type: GraphQLString } ,
        destination_longitude : { type: GraphQLString },
        region : { type: GraphQLString },
        address : { type: GraphQLString },
        latitude : { type: GraphQLString },
        longitude : { type: GraphQLString },
        nr_rooms : { type: GraphQLID } ,
        // themes : {
        //     type: new GraphQLList(ThemesType), 
        //     resolve(parent, args){
        //         return parent.themes;
        //     }
        // },
        // facilities : { 
        //     type: new GraphQLList(FacilitiesType),
        //     resolve(parent, args){
        //         return parent.facilities;
        //     }
        // } ,
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hotel:{
            type: GraphQLList(HotelType),
            args: { 
                star: { type: GraphQLID }, 
                country_code: { type: GraphQLString }, 
            
            },
            resolve(parent, args){
                //this logic need some database integrity in mysql 
                //for themes, facilities 
                //like join and other 
                //others is okey mongo and mysql can work together
                const result = sequelize.query("SELECT `tws_hotelspro_hotels`.`code` , `tws_hotelspro_hotels`.`name` , `tws_hotelspro_hotels`.`star` , `tws_hotelspro_hotels`.`country` AS `country_code` , `tws_hotelspro_countries`.`name` AS `country_name` , `tws_hotelspro_destinations`.`name` AS `destination` , `tws_hotelspro_destinations`.`latitude` AS `destination_latitude` , `tws_hotelspro_destinations`.`longitude` AS `destination_longitude` , `tws_hotelspro_regions`.`name` AS `region` , `tws_hotelspro_hotels`.`address` , `tws_hotelspro_hotels`.`latitude` , `tws_hotelspro_hotels`.`longitude` , `tws_hotelspro_hotels`.`nr_rooms` , `tws_hotelspro_hotels`.`themes` , `tws_hotelspro_hotels`.`facilities` FROM `travia_api`.`tws_hotelspro_hotels` LEFT JOIN `travia_api`.`tws_hotelspro_countries` ON(`tws_hotelspro_hotels`.`country` = `tws_hotelspro_countries`.`code`) LEFT JOIN `travia_api`.`tws_hotelspro_destinations` ON (`tws_hotelspro_destinations`.`code` = `tws_hotelspro_hotels`.`destination`) LEFT JOIN `travia_api`.`tws_hotelspro_regions` ON (`tws_hotelspro_hotels`.`regions` = `tws_hotelspro_regions`.`code`) WHERE `travia_api`.`tws_hotelspro_hotels`.`country` = 'tr' AND `travia_api`.`tws_hotelspro_hotels`.`star` = "+ args.star +" AND `travia_api`.`tws_hotelspro_hotels`.`themes` != '' LIMIT 5 ;", {
                    model: HotelsMysql,
                    mapToModel: true 
                  });
                 
                  return result;
                // return HotelsMongo.find({ star: args.star }).then( foundHotel =>{
                //     return foundHotel;
                // });
               
                
            }
        }
        
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addHotel:{
            type: HotelType,
            args: { name:{ type: GraphQLString } },
            resolve(parent, args){
                let Hotel = new Hotel({
                    name: args.name,
                    star: args.star,
                    country_code: args.country_code,
                    country_name: args.country_name
                })
                Hotel.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});