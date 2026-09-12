const musicModel = require("../models/music.model");
const albumModel=require('../models/album.model');
const jwt = require("jsonwebtoken");
require('dotenv').config()

const { uploadFile } = require("../services/storage.services");

async function createMusic(req, res) {

        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,
        });

        res.status(201).json({
            message: "Music created successfully...✅",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            },
        });
}

async function createAlbum(req,res){
   

        const {title,musics}=req.body;

        const album=await albumModel.create({
            title,
            artist:req.user.id,
            musics:musics
        })

        res.status(201).json({
            message:"Album Created successfully...",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics
            }
        })

}

async function getAllMusics(req,res){

    const musics=await musicModel
    .find()
    //skip(value) --it skips the no.of value here music. this skip() and limit() are very useful in Pagination.
    .limit(2) //it limits the music to certain no at once. Since in actual production let us take Spotify it has millions of musics..
    //so it can't be load all if it then server overloads.that's why we use limit() 
    .populate("artist","username email") // this populate gives the data of 2nd arugument with related to 1st

    res.status(200).json({
        message:"Musics fetched successfully",
        musics:musics
    })
}

async function getAllAlbums(req,res){

    const albums=await albumModel.find().select("title artist").populate("artist","username email") // here select method used for optimization.
    //so in the response we get the title and artist data not musics

    res.status(200).json({
        message:"Albums fetched successfully",
        albums:albums
    })
}

async function getAlbumById(req,res){
    const albumId=req.params.albumId;

    const album=await albumModel.findById(albumId).populate("artist","username email").populate("musics")

    return res.status(200).json({
        meaage:"Album fetched successfully..",
        album:album
    })
}

module.exports = { createMusic, createAlbum , getAllMusics, getAllAlbums, getAlbumById};
