#!/bin/bash

echo 'Build started.'

# initialize messages
rm -rf messages
rm messages.js

# ------------------------------------------------------------------------------

# make messages from datfiles
echo 'Started to make messages from datfile.'
ls datfiles | grep -v offensive | while IFS= read -r category;
do
	echo "processing datfile $category ...";
	i=0;
	file_name=`printf '%05d' "$i"`;
	mkdir -p "messages/$category"
	ls "datfiles/$category" | while IFS= read -r line;
	do
		if [ "$line" = '%' ];
		then
			i=$((i+1));
			file_name=`printf '%05d' "$i"`;
		else
			printf '%s\n' "$line" >> "messages/$category/$file_name";
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
	mkdir -p "messages/offensive/$category"
	ls "datfiles/offensive/$category" | while IFS= read -r line;
	do
		if [ "$line" = '%' ];
		then
			i=$((i+1));
			file_name=`printf '%05d' "$i"`;
		else
			printf '%s\n' "$line" >> "messages/offensive/$category/$file_name";
		fi
	done;
done;

echo 'Finished to make offensive messages from datfiles.'

# ------------------------------------------------------------------------------

# make messages.js
echo 'Started to make messages.js'
output='messages.js';

echo 'export const categories = [' > "$output";

ls 'messages' | grep -v 'offensive' | while read cookie;
do
    last_file=`ls "messages/$cookie" | tail -n 1 | sed 's/^0*//g'`;
    count=`echo $last_file-1 | bc`;
    echo '  {'                    >> "$output";
    echo "    label: '$cookie',"  >> "$output";
    echo "    count: $count,"     >> "$output";
    echo '    offensive: false'   >> "$output";
    echo '  },'                   >> "$output";
done;

ls 'messages/offensive' | while read cookie;
do
    last_file=`ls "messages/offensive/$cookie" | tail -n 1 | sed 's/^0*//g'`;
    count=`echo $last_file-1 | bc`;
    echo '  {'                    >> "$output";
    echo "    label: '$cookie',"  >> "$output";
    echo "    count: $count,"     >> "$output";
    echo '    offensive: true'    >> "$output";
    echo '  },'                   >> "$output";
done;

echo '];'                         >> "$output";

# ------------------------------------------------------------------------------

echo 'Build finished.'
