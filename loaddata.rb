#!/usr/bin/ruby
# encoding: utf-8

require "csv"
require "Base64"

# パスを指定してcsvをロードする
def loadCSV(filename)
	csv = CSV.read(filename, encoding: "SJIS:UTF-8")
	return csv
end

# CSVを書き込む
def writeCSV(arr, filename)
	CSV.open(filename, 'w') do |writer|
		arr.each{|row| writer << row}
	end
end
# CSV用の配列から文字を検索する
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

# 花（マリメッコ系）の商品を削除
def remove_flower(csv)
	csv.each_with_index do |row, index|
		if row[9] != nil && row[9] =~ /flower/ then
			csv.delete_at(index)
		end
	end
end

# 古い（卸先が使ってる）商品コードに妥当する商品を削除
def remove_oldcode(csv, pattern)
	index = -1
	index =	csv.find_index {|item| item[2] =~ /#{pattern}/}
	if index != nil && index >= 0 then
		p "hit!"
		csv.delete_at(index)
	end
end

def remove_noImageData(csv)
	csv.each_with_index do |row, index|
		if index == 0 then 
			next	
		end
		if !checkImage(row[2]) then
			csv.delete_at(index)
		end
	end
end
# 商品コードをすべて表示する。
def viewCode(csv)
	csv.each_with_index do |row, index|
		p row[2]  +"   :" + index.to_s

	end
end
# 自社で使う商品コードに変換する
def setCode(csv, start)
	csv.each_with_index do |row, index|
		if index == 0 then next end
		row[200] = start
		start = start + 1
	end
	if start % 8 != 0 then
		count = 8 - (start % 8) - 1;
		count.times do
			csv.push ["","","","","","","","","","","","","","","","","","","",""]
		end
	end
end
# 商品説明文から画像パスを取得する。（現在は使用されていない）
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
# 画像があるかどうかを確認する
def checkImage(filename)
	path = Dir::glob("./pictures/" << filename.downcase << "*")
	if path.length > 5 || path.length == 0 then
		return false	
	else
		return true
	end
end
# 画像のなめからimgタグを作成する。
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
# カテゴリをまとめたファイルを作る(html)
def generateCatalog(csv)
	if File.exists?("catalog.html") then
		File.delete("catalog.html")
	end
	File.open("catalog.html", "w") do |file|
		file.write File.open("head.m","r").read

		csv.each_with_index do |row, index|
			if index == 0 then
				next
			end
			if (index - 1 ) % 8 == 0 then
				if index  >= 8 then
					file.write "</table>"
				end
			end
			if (index - 1) % 8 == 0 then
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
	remove_noImageData(csv)
	remove_noImageData(csv)
	remove_noImageData(csv)
	remove_noImageData(csv)
	setCode(csv, 2175)
	return csv
end
