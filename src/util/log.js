const util = require( 'util' );

const log = ( ...args ) =>
  console.log(
    // JSON.stringify( args, null, '  ' )
    util.inspect( args, {
      showHidden: false,
      depth: 10,
      colors: true,
      sorted: false,
      getters: true
    } )

  )

module.exports = log;