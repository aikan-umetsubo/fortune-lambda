#!/bin/bash

echo 'Build started.';

# constants
js_output='./build/messages.js';
dir_output='./build/messages';

# remove previous build artifacts
rm -rf ./build;
mkdir ./build

# ------------------------------------------------------------------------------

# make messages from datfiles
echo 'Started to make messages from datfile.'
ls datfiles | grep -v offensive | while IFS= read -r category;
do
	echo "processing datfile $category ...";
	i=0;
	file_name=`printf '%05d' "$i"`;
	mkdir -p "$dir_output/$category"
	cat "datfiles/$category" | while IFS= read -r line;
	do
		if [ "$line" = '%' ];
		then
			i=$((i+1));
			file_name=`printf '%05d' "$i"`;
		else
			printf '%s\n' "$line" >> "$dir_output/$category/$file_name";
		fi
	done;
done;

echo 'Finished to make messages from datfile.'

# ------------------------------------------------------------------------------

# make messages from datfiles(offensive)
echo 'Started to make offensive messages from datfiles.'

ls datfiles/offensive | while IFS= read -r category;
do
	echo "processing offensive datfile $category ...";
	i=0;
	file_name=`printf '%05d' "$i"`;
	mkdir -p "$dir_output/offensive/$category"
	cat "datfiles/offensive/$category" | while IFS= read -r line;
	do
		if [ "$line" = '%' ];
		then
			i=$((i+1));
			file_name=`printf '%05d' "$i"`;
		else
			printf '%s\n' "$line" >> "$dir_output/offensive/$category/$file_name";
		fi
	done;
done;

echo 'Finished to make offensive messages from datfiles.'

# ------------------------------------------------------------------------------

# make messages.js
echo 'Started to make messages.js'

echo 'const categories = ['          > "$js_output";

ls "$dir_output" | grep -v 'offensive' | while read cookie;
do
    last_file=`ls "$dir_output/$cookie" | tail -n 1 | sed 's/^0*//g'`;
    count=`echo $last_file-1 | bc`;
    echo '  {'                      >> "$js_output";
    echo "    label: '$cookie',"    >> "$js_output";
    echo "    count: $count,"       >> "$js_output";
    echo '    offensive: false'     >> "$js_output";
    echo '  },'                     >> "$js_output";
done;

ls "$dir_output/offensive" | while read cookie;
do
    last_file=`ls "$dir_output/offensive/$cookie" | tail -n 1 | sed 's/^0*//g'`;
    count=`echo $last_file-1 | bc`;
    echo '  {'                      >> "$js_output";
    echo "    label: '$cookie',"    >> "$js_output";
    echo "    count: $count,"       >> "$js_output";
    echo '    offensive: true'      >> "$js_output";
    echo '  },'                     >> "$js_output";
done;

echo '];'                           >> "$js_output";
echo 'module.exports = categories;' >> "$js_output";

# ------------------------------------------------------------------------------

echo 'Build finished.'
