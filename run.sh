#!/bin/bash

# ----------- URI -----------
mongo36=mongodb://mongo36:27036
mongo40=mongodb://mongo40:27040
mongo44=mongodb://mongo44:27044
mongo50=mongodb://mongo50:27050

# ----------- Config -----------
numberOfNetworks=1
numberOfChannels=1
numberOfUsers=500000
numberOfChannelUsers=500000

./generate.sh --uri $mongo36 --network $numberOfNetworks --channel $numberOfChannels --user 500000 --channeluser 500000
./generate.sh --uri $mongo36 --network $numberOfNetworks --channel $numberOfChannels --user 100000 --channeluser 100000 --append -a
./generate.sh --uri $mongo36 --network $numberOfNetworks --channel $numberOfChannels --user 50000 --channeluser 50000 --append -a
./generate.sh --uri $mongo36 --network $numberOfNetworks --channel $numberOfChannels --user 10000 --channeluser 10000 --append -a
./generate.sh --uri $mongo36 --network $numberOfNetworks --channel $numberOfChannels --user 5000 --channeluser 5000 --append -a
./generate.sh --uri $mongo36 --network $numberOfNetworks --channel $numberOfChannels --user 1000 --channeluser 1000 --append -a

./generate.sh --uri $mongo40 --network $numberOfNetworks --channel $numberOfChannels --user 500000 --channeluser 500000
./generate.sh --uri $mongo40 --network $numberOfNetworks --channel $numberOfChannels --user 100000 --channeluser 100000 --append -a
./generate.sh --uri $mongo40 --network $numberOfNetworks --channel $numberOfChannels --user 50000 --channeluser 50000 --append -a
./generate.sh --uri $mongo40 --network $numberOfNetworks --channel $numberOfChannels --user 10000 --channeluser 10000 --append -a
./generate.sh --uri $mongo40 --network $numberOfNetworks --channel $numberOfChannels --user 5000 --channeluser 5000 --append -a
./generate.sh --uri $mongo40 --network $numberOfNetworks --channel $numberOfChannels --user 1000 --channeluser 1000 --append -a

./generate.sh --uri $mongo44 --network $numberOfNetworks --channel $numberOfChannels --user 500000 --channeluser 500000
./generate.sh --uri $mongo44 --network $numberOfNetworks --channel $numberOfChannels --user 100000 --channeluser 100000 --append -a
./generate.sh --uri $mongo44 --network $numberOfNetworks --channel $numberOfChannels --user 50000 --channeluser 50000 --append -a
./generate.sh --uri $mongo44 --network $numberOfNetworks --channel $numberOfChannels --user 10000 --channeluser 10000 --append -a
./generate.sh --uri $mongo44 --network $numberOfNetworks --channel $numberOfChannels --user 5000 --channeluser 5000 --append -a
./generate.sh --uri $mongo44 --network $numberOfNetworks --channel $numberOfChannels --user 1000 --channeluser 1000 --append -a

./generate.sh --uri $mongo50 --network $numberOfNetworks --channel $numberOfChannels --user 500000 --channeluser 500000
./generate.sh --uri $mongo50 --network $numberOfNetworks --channel $numberOfChannels --user 100000 --channeluser 100000 --append -a
./generate.sh --uri $mongo50 --network $numberOfNetworks --channel $numberOfChannels --user 50000 --channeluser 50000 --append -a
./generate.sh --uri $mongo50 --network $numberOfNetworks --channel $numberOfChannels --user 10000 --channeluser 10000 --append -a
./generate.sh --uri $mongo50 --network $numberOfNetworks --channel $numberOfChannels --user 5000 --channeluser 5000 --append -a
./generate.sh --uri $mongo50 --network $numberOfNetworks --channel $numberOfChannels --user 1000 --channeluser 1000 --append -a