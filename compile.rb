require 'rubygems'
require 'fssm'

source_path     = ARGV[0] || "haml"
build_path      = ARGV[1] || "views"

source_dir      = File.join(File.dirname(__FILE__), source_path)

FSSM.monitor(source_dir, '**/*.haml') do
    update do |base, relative|
        input       = File.join(base, relative)
        output      = File.join(File.dirname(base), build_path, relative.gsub!('.haml', '.ejs'))
        command     = "haml #{input} #{output} -f xhtml -t ugly -q --no-escape-attrs"

        %x{#{command}}

        puts <<-eos
HTML Compiling... [#{source_path }] => [#{build_path}] (Time: #{Time.now.strftime("%Y/%m/%d %H:%M")}):
        - FROM:     #{input}
        - TO:       #{output}
        eos
    end
end