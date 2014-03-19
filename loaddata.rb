#!/usr/bin/ruby
# encoding: utf-8

require "csv"

def loadCSV(filename)
	csv = CSV.read(filename, encoding: "SJIS:UTF-8")
	return csv
end

def writeCSV(arr, filename)
	CSV.open(filename, 'w') do |writer|
		arr.each{|row| writer << row}
	end
end
def search(csv, word)
	i = 0
	csv.each_with_index do |row, index|
	#	col.each_with_index do |row, index|
			if row[9] != nil && row[9] =~ /#{word}/ then
			p row.find_index {|item|item =~ /#{word}/}
			p ""
			p row[1]
			p index
			i = i + 1
			end
	#	end
	end
	p i
end

def remove_flower(csv)
	csv.each_with_index do |row, index|
		if row[9] != nil && row[9] =~ /flower/ then
			csv.delete_at(index)
		end	
	end
end
def remove_oldcode(csv, pattern)
	index = -1
	index =	csv.find_index {|item| item[2] =~ /#{pattern}/}
	if index != nil && index >= 0 then
		p "hit!"
		csv.delete_at(index)
	end
end
def viewCode(csv)
	csv.each_with_index do |row, index|
		p row[2]  +"   :" + index.to_s

	end
end

def setCode(csv, start)
	csv.each_with_index do |row, index|
		if index == 0 then next end
		row[200] = start
		start = start + 1
	end
end

def getImageFileName(row)
	text = row[9][0..150]
	start = text =~ /http\:\/\/lib2\.shopping\.srv\.yimg\.jp\/lib\//
	if start == nil then 
		return nil 
	end
	text = text[start + 51 ..150]
	if text == nil then
		return nil
	end

	path = text.scan /\S*\.jpg/
	return path
end
def createImageTag(filename)
	path = Dir::glob("./pictures/" << filename.downcase << "*")
	if path.length > 5 then
		p "yabai"
		return ""
	elsif path.length == 0 then
		p "nil"
		return ""
	end
	p path[0]
	f = File.open(path[0])
	img = "<img src=\""
	img << "data:image/jpeg;base64, " << Base64.encode64(f.read)
	img << "\" width=\"100px\" height=\"100px\"></img>"
	return img
end
def generateCatalog(csv)
	File.delete("catalog.html")
	File.open("catalog.html", "w") do |file|
		file.write File.open("head.m","r").read 
		
		csv.each_with_index do |row, index|
			if index == 0 then
				next
			end
			if (index - 1) % 8 == 0 then
				file.write "</table>"
				file.write "<table>"
			end
	file.write "<tr>"
	file.write "<td contenteditable=true>松平<br>商会</td>\n"		#会社名
	file.write "<td contenteditable=true>" + row[200].to_s	<< "</td>\n"	#商品コード
	file.write "<td contenteditable=true>" + row[8] << "</td>\n"		#商品名
	file.write "<td contenteditable=true>" << createImageTag(row[2]) << "</td>\n"
							#ファイルの画像パス
	file.write "<td contenteditable=true>" + row[5].to_s	<< "</td>\n"		#仕入れ値
	file.write "<td contenteditable=true></td>"				#売値（今は空）
	file.write "<td><span>Y</span><span>ヤ</span><span>D</span><span>A</span></td>"
	file.write "</tr>\n"
		end

		file.write File.open("foot.m", "r").read
	end	
end
def main()
	csv = loadCSV("data.csv")
	#マリメッコ系の商品を削除
	remove_flower(csv)
	remove_flower(csv)
	#既存の商品を削除
	remove_items = ["portable-led-battery", "iphone-cube", "iPhone5-quilt-book", "iPhone-nail"]
	remove_items.each do |s|
		remove_oldcode(csv, s)
	end
	setCode(csv, 2175)
	return csv
end
