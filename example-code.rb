require 'json'

puts "var examples = {};\n\n"
puts "examples.all = #{JSON.dump(ARGV)};\n\n";

ARGV.each do |file|
  puts "examples['#{file}'] = #{JSON.dump(File.read(file))};\n\n"
end
