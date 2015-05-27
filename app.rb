
require 'sinatra'
require 'json'



  get '/' do
    File.read('views/index.html')

  end

  get '/favorites' do
    response.header['Content-Type'] = 'application/json'
    File.read('data.json')

  end
  get '/favoritelist' do
      File.read('views/favoritelist.html')
  end

  
  post '/favorites' do
    if File.read('data.json').length >= 2
      file = JSON.parse( File.read('data.json') )
    end
     file = JSON.parse(File.read('data.json'))
   
   params = JSON.parse(request.body.read)
   
    
    movie = { 
      favTitle: params["title"],
      favYear: params["year"],
      favRated: params["rated"],
      favGenre: params["genre"],
      favPlot: params["plot"],
      favPoster: params["poster"]
      }
      
    movie.to_json

    file << movie
    
    File.write('data.json',JSON.pretty_generate(file))
    puts file
    redirect '/'
  end


