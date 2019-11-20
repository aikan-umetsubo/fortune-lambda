#!/bin/bash

echo 'Build started.'

# make messages from datfiles
echo 'Started to make messages from datfile.'

ls datfiles | grep -v offensive | while IFS= read -r file;
do
	echo "processing datfile $file ...";
	i=0;
	file_name=`printf '%05d' "$i"`;
	mkdir -p "messages/$file"
	while IFS= read -r line;
	do
		if [ "$line" = '%' ];
		then
			i=$((i+1));
			file_name=`printf '%05d' "$i"`;
		else
			printf '%s\n' "$line" >> "messages/$file/$file_name";
		fi
	done < "datfiles/$file";
done;

echo 'Finished to make messages from datfile.'

# make messages from datfiles(offensive)
echo 'Started to make offensive messages from datfiles.'

ls datfiles/offensive | while IFS= read -r file;
do
	echo "processing offensive datfile $file ...";
	i=0;
	file_name=`printf '%05d' "$i"`;
	mkdir -p "messages/offensive/$file"
	while IFS= read -r line;
	do
		if [ "$line" = '%' ];
		then
			i=$((i+1));
			file_name=`printf '%05d' "$i"`;
		else
			printf '%s\n' "$line" >> "messages/offensive/$file/$file_name";
		fi
	done < "datfiles/offensive/$file";
done;

echo 'Finished to make offensive messages from datfiles.'

# display the number of messages for serverless.yml.
echo 'Set the environment variable below to serverless.yml.'
ls 'messages' | grep -v 'offensive' | while read cookie;
do
    count=`ls "messages/$cookie" | tail -n 1 | sed 's/^0*//g'`;
    echo "$cookie: $count";
done;
ls 'messages/offensive' | while read cookie;
do
    count=`ls "messages/offensive/$cookie" | tail -n 1 | sed 's/^0*//g'`;
    echo "offensive_$cookie: $count";
done;

echo
echo 'Build finished.'