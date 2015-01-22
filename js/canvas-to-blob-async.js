/* 	
	From https://code.google.com/p/chromium/issues/detail?id=67587
	By "acmesqua...@gmail.com" Dec 30, 2014
	based on https://code.google.com/p/chromium/issues/detail?id=308768

	Renamed function to toBlobAsync and restructured it a bit for readability
	by Luke Nickerson 2015
*/
if (typeof HTMLCanvasElement.prototype.toBlobAsync === 'undefined') 
{
	Object.defineProperty( 
		HTMLCanvasElement.prototype, 
		'toBlobAsync', 
		{
			value: function( callback, type, quality ) {
				var xhr = new XMLHttpRequest;
				xhr.open( 'GET', this.toDataURL( type, quality ) );
				xhr.responseType = 'arraybuffer';
				xhr.onload = function(e) {
					callback( 
						new Blob( [this.response], {type: type || 'image/png'} )
					);
				}
				xhr.send();
			}
		}
	);
}