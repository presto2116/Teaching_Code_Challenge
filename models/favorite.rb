class Favorite < ActiveRecord::Base
	validates :title, :year, :rated, :genre, :plot, :presence => true 
end
