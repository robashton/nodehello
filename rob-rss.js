var xml = require('./node-xml');

exports.parse = function(itemCallback, finishCallback)
{
 return new xml.SaxParser(function(cb){
                                        var inItem = false;
                                        var contentBuffer = '';
                                        var currentItem = {};
                                        cb.onStartDocument(function(){
                                        });
                                        cb.onEndDocument(function(){
						
                                        });
                                        var isLink = false;
                                        cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
                                                if(elem == 'item' || elem == 'entry') { inItem = true;}
                                        });
                                        cb.onCharacters(function(chars){
                                                if(inItem) { contentBuffer += chars; }
                                        });
                                        cb.onCdata(function(chars){
                                                if(inItem) { contentBuffer += chars; }
                                        });
                                        cb.onEndElementNS(function(elem, attrs, prefix) {
                                                if(inItem) {
                                                        if(elem == 'item' || elem == 'entry')
                                                        {
                                                                inItem = false;
                                                                itemCallback(currentItem);
                                                                currentItem = {};
                                                        }
                                                        else
                                                        {
                                                                currentItem[elem] = contentBuffer.replace(/\s\s*$/, '');
                                                        }
                                                contentBuffer = '';
                                                }
                                        });

                                });
};


