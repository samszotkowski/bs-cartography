const config = require('./config.js')
const map_dimensions = require('./map_dimensions.js')

let room_overlay_layer = null

const room_overlay_set_visibility = (map) => {
    if(map.getZoom() < config.room_entity_zoom_cutoff && !map.hasLayer(room_overlay_layer)) {
        if(ENV.DEBUG === true){
            console.log('Room Overlay: Visible!')
        }
        room_overlay_layer.addTo(map)
    }
    if(map.getZoom() > config.room_entity_zoom_cutoff && map.hasLayer(room_overlay_layer)) {
        if(ENV.DEBUG === true){
            console.log('Room Overlay: Invisible!')
        }
        room_overlay_layer.remove()
    }
}

const add_room_overlay_update_event = (map) => {
    map.on('zoomend', (event) => room_overlay_set_visibility(map))
}

const setup_room_overlay = (map) => {
    if(room_overlay_layer !== null) {
        room_overlay_layer.remove()
    }
    room_overlay_layer = L.tileLayer(config.room_overlay_url, {
        errorTileUrl: config.room_overlay_error_url,
        noWrap: true,
        minNativeZoom: config.minZoom,
        maxNativeZoom: config.maxZoom,
        tileSize: map_dimensions.tile_zoom0_size,
    })
    add_room_overlay_update_event(map)
    room_overlay_set_visibility(map)
}


module.exports = {
    setup_room_overlay,
}