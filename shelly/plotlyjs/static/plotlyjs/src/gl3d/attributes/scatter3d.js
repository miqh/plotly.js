'use strict';

var Plotly = require('../../plotly');
var MARKER_SYMBOLS = require('../lib/markers.json');

var scatterAttrs = Plotly.Scatter.attributes,
    scatterLineAttrs = scatterAttrs.line,
    scatterMarkerAttrs = scatterAttrs.marker,
    scatterMarkerLineAttrs = scatterMarkerAttrs.line,
    extendFlat = Plotly.Lib.extendFlat;

function makeProjectionAttr(axLetter) {
    return {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            description: [
                'Sets whether or not projections are shown along the',
                axLetter, 'axis.'
            ].join(' ')
        },
        opacity: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 1,
            dflt: 1,
            description: 'Sets the projection color.'
        },
        scale: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 10,
            dflt: 2/3,
            description: [
                'Sets the scale factor determining the size of the',
                'projection marker points.'
            ].join(' ')
        }
    };
}

module.exports = {
    x: {
        valType: 'data_array',
        description: 'Sets the x coordinates.'
    },
    y: {
        valType: 'data_array',
        description: 'Sets the y coordinates.'
    },
    z: {
        valType: 'data_array',
        description: 'Sets the z coordinates.'
    },
    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (x,y,z) triplet.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (x,y,z) coordinates.'
        ].join(' ')
    }),
    mode: extendFlat({}, scatterAttrs.mode,  // shouldn't this be on-par with 2D?
        {dflt: 'lines+markers'}),
    surfaceaxis: {
        valType: 'enumerated',
        role: 'info',
        values: [-1, 0, 1, 2],
        dflt: -1,
        description: [
            'If *-1*, the scatter points are not fill with a surface',
            'If *0*, *1*, *2*, the scatter points are filled with',
            'a Delaunay surface about the x, y, z respectively.'
        ].join(' ')
    },
    surfacecolor: {
        valType: 'color',
        role: 'style',
        description: 'Sets the surface fill color.'
    },
    projection: {
        x: makeProjectionAttr('x'),
        y: makeProjectionAttr('y'),
        z: makeProjectionAttr('z')
    },
    line: {
        color: scatterLineAttrs.color,
        width: scatterLineAttrs.width,
        dash: scatterLineAttrs.dash
    },
    marker: {  // Parity with scatter.js?
        color: scatterMarkerAttrs.color,
        symbol: {
            valType: 'enumerated',
            values: Object.keys(MARKER_SYMBOLS),
            role: 'style',
            dflt: 'circle',
            arrayOk: true,
            description: 'Sets the marker symbol type.'
        },
        size: extendFlat({}, scatterMarkerAttrs.size, {dflt: 8}),
        sizeref: scatterMarkerAttrs.sizeref,
        sizemin: scatterMarkerAttrs.sizemin,
        sizemode: scatterMarkerAttrs.sizemode,
        opacity: scatterMarkerAttrs.opacity,
        colorscale: scatterMarkerAttrs.colorscale,
        cauto: scatterMarkerAttrs.cauto,
        cmax: scatterMarkerAttrs.cmax,
        cmin: scatterMarkerAttrs.cmin,
        autocolorscale: scatterMarkerAttrs.autocolorscale,
        reversescale: scatterMarkerAttrs.reversescale,
        showscale: scatterMarkerAttrs.showscale,
        line: {
            color: scatterMarkerLineAttrs.color,
            width: extendFlat({}, scatterMarkerLineAttrs.width, {arrayOk: false}),
            colorscale: scatterMarkerLineAttrs.colorscale,
            cauto: scatterMarkerLineAttrs.cauto,
            cmax: scatterMarkerLineAttrs.cmax,
            cmin: scatterMarkerLineAttrs.cmin,
            autocolorscale: scatterMarkerLineAttrs.autocolorscale,
            reversescale: scatterMarkerLineAttrs.reversescale
        }
    },
    textposition: extendFlat({}, scatterAttrs.textposition, {dflt: 'top center'}),
    textfont: scatterAttrs.textfont,
    _nestedModules: {
        'error_x': 'ErrorBars',
        'error_y': 'ErrorBars',
        'error_z': 'ErrorBars',
        'marker.colorbar': 'Colorbar'
    }
};
