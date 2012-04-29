require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

get '/' do
  'hello'
end