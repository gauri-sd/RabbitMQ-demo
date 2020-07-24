const   Response            = require('../utils/response'),
        ResponseMessage     = require('../utils/responseMessages'),
        StatusCode          = require('../utils/statusCodes'),
        Constant            = require('../utils/constants'),
        to                  = require('../utils/promise_handler'),
        ApiCallFactory      = require('../factory/api_example'),
        ItemListStore       = require('../models/example_model'),
        cityModel           = require('../models/weather_model');
        request             = require('request');
        Q                   = require('../services/MQService');

// For Database
exports.getAllProduct = async (request, reply)=>{
    try{
        let itemList = await ItemListStore.find();
        return reply.response(Response.sendResponse(true, itemList, ResponseMessage.SUCCESS, StatusCode.OK));
    }catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

exports.getOneProduct = async(request, reply)=>{
    try{
        //let itemList = await ItemListStore.create(request.payload);
        let itemList = await ItemListStore.findById(request.params.id);
        return reply.response(Response.sendResponse(true, itemList, ResponseMessage.SUCCESS, StatusCode.OK));
    }catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

exports.addProduct = async (request, reply) =>{
    try{
        let itemList = await ItemListStore.create(request.payload);
        return reply.response(Response.sendResponse(true, itemList, ResponseMessage.SUCCESS, StatusCode.CREATED));
    }catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

exports.updateProduct = async(request, reply)=>{
    try{
        console.log(request.payload);
        // let itemList = await ItemListStore.findByIdAndUpdate({_id:request.params.id}, request.payload, function(err,prod) {
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else{
        //         console.log(prod);
        //     }
        // });
        let itemList = await ItemListStore.findByIdAndUpdate(request.params.id, request.payload, {new: true});
        console.log(itemList);
        return reply.response(Response.sendResponse(true, itemList, ResponseMessage.SUCCESS, StatusCode.OK));
    }catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

exports.deleteProduct = async(request, reply)=>{
    try{
        let itemList  = await ItemListStore.findByIdAndDelete(request.params.id);
        return reply.response(Response.sendResponse(true, itemList, ResponseMessage.SUCCESS, StatusCode.OK));
    }catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

// Weather
// exports.getWeather = async(request, reply)=>{
//     try{
//         let city  = await cityModel.find({}, function(err,cities) {
//             console.log(cities);
//             ApiCallFactory.getWeather(cities).then(function(results) {
//                 let weather_data = {weather_data : results};
//                 reply.response(weather_data);
//                 console.log(weather_data);
//             }) ;
//         });
//         return reply.response(Response.sendResponse(true, city, ResponseMessage.SUCCESS, StatusCode.OK));
//     }catch(error){
//         return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
//     }
// }

// exports.getWeather = async(request, reply)=>{
//     try{
//         let weather_data;

//         cityModel.find({}, function(err,cities){
//             weather_data =  ApiCallFactory.getWeather(cities).then();
//             onsole.log(weathe_data);
//             //return reply.response(Response.sendResponse(true, weather_data, ResponseMessage.SUCCESS, StatusCode.OK));
//         });
//     }catch(error){
//         console.log(error);
//         return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
//     }
// }

exports.getWeather = async(request, reply) => {
    try{
        let weather_data  = {};
        let city = await cityModel.find();
        weather_data['weather_data'] = await ApiCallFactory.getWeather(city);
        // .then(function(results) {
        //     console.log(results);
        // });
        await Q.pQueue(queue, weather_data);
        return reply.response(Response.sendResponse(true, weather_data, ResponseMessage.SUCCESS, StatusCode.OK));
    }
    catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

exports.getWeatherMQRabbit = async(request, reply) => {
    try{
        const receive = await Q.receive(queue);
        return reply.response(Response.sendResponse(true, receive, ResponseMessage.SUCCESS, StatusCode.OK));
    }
    catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

exports.addCity = async(request, reply)=>{
    try{
        let newCity  = await new cityModel({name : request.payload.name});
        newCity.save();
        reply.redirect('/api/weather/list'); 
        return reply.response(Response.sendResponse(true, newCity, ResponseMessage.SUCCESS, StatusCode.OK));
    }catch(error){
        return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
    }
}

// exports.getWeather = async(request, reply)=>{
//     try{
//         [err , res] = await to(ApiCallFactory.getWeather());
//         if(err){
//             throw err;
//         }else{
//             return reply.response(Response.sendResponse(true, res, ResponseMessage.SUCCESS, StatusCode.OK));
//         }
//     }catch(error){
//         return reply.response(Response.sendResponse(false, error, ResponseMessage.ERROR, StatusCode.BAD_REQUEST));
//     }
// }

