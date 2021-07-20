#!/bin/bash

# ----------- APP -----------
mgen=./mgodatagen/mgodatagen

while [ $# -gt 0 ]; do
   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
        # echo $1 $2 // Optional to see the parameter:value result
   fi
  shift
done



echo "Config -> Network=$network, Channel=$channel, User=$user, ChannelUser=$channeluser"

dist_network=dist/n-$network
dist_channel=$dist_network-ch-$channel
dist_user=$dist_channel-ur-$user
dist_channel_user=$dist_user-ch_ur-$channeluser

sed -e "s/numberOfNetworks/$network/g" model/data.tpl > $dist_network.json
sed -e "s/numberOfChannels/$channel/g" $dist_network.json > $dist_channel.json
sed -e "s/numberOfUsers/$user/g" $dist_channel.json > $dist_user.json
sed -e "s/numberOfChannelUsers/$channeluser/g" $dist_user.json > $dist_channel_user.json

rm $dist_network.json
rm $dist_channel.JSON
rm $dist_user.json

$mgen $append -f $dist_channel_user.json --uri $uri

# sed -e "s/numberOfNetwork/1000/g" model/jam.json > dist/new-gen.json

# ./mgodatagen/mgodatagen    -f model/net-ch-u-500K.json --uri=mongodb://localhost:27036
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-100K.json --uri=mongodb://localhost:27036
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-50K.json --uri=mongodb://localhost:27036
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-10K.json --uri=mongodb://localhost:27036
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-5K.json --uri=mongodb://localhost:27036
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-1K.json --uri=mongodb://localhost:27036

# ./mgodatagen/mgodatagen    -f model/net-ch-u-500K.json --uri=mongodb://localhost:27040
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-100K.json --uri=mongodb://localhost:27040
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-50K.json --uri=mongodb://localhost:27040
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-10K.json --uri=mongodb://localhost:27040
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-5K.json --uri=mongodb://localhost:27040
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-1K.json --uri=mongodb://localhost:27040

# ./mgodatagen/mgodatagen    -f model/net-ch-u-500K.json --uri=mongodb://localhost:27044
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-100K.json --uri=mongodb://localhost:27044
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-50K.json --uri=mongodb://localhost:27044
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-10K.json --uri=mongodb://localhost:27044
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-5K.json --uri=mongodb://localhost:27044
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-1K.json --uri=mongodb://localhost:27044

# ./mgodatagen/mgodatagen    -f model/net-ch-u-500K.json --uri=mongodb://localhost:27050
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-100K.json --uri=mongodb://localhost:27050
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-50K.json --uri=mongodb://localhost:27050
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-10K.json --uri=mongodb://localhost:27050
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-5K.json --uri=mongodb://localhost:27050
# ./mgodatagen/mgodatagen -a -f model/net-ch-u-1K.json --uri=mongodb://localhost:27050