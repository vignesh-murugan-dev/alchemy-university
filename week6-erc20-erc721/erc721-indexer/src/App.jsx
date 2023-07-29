import {
  Box,
  ButtonGroup,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  Spinner,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';


function App() {

  // local state variables
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [clicked, setClicked] = useState(false);

  const walletConnect = () => {
    
    // connect web3 wallet to frontedn
    if(window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(res => {setUserAddress(res[0]); console.log(userAddress)});
    }
    else{
      alert("Install a wallet");
    }
  }


  const mainnetAPI = import.meta.env.VITE_REACT_APP_MAINNET_API;
  const mumbaiAPI = import.meta.env.VITE_REACT_APP_MUMBAI_API;
  const goerliAPI = import.meta.env.VITE_REACT_APP_GOERLI_API;
  const sepoliaAPI = import.meta.env.VITE_REACT_APP_MAINNET_API;

  const ethMainnet = Network.ETH_MAINNET;
  const maticMumbai = Network.MATIC_MUMBAI;
  const goerli = Network.ETH_GOERLI;
  const sepolia = Network.ETH_SEPOLIA;

  async function getNFTsForOwner(apiKey, network) {
    setClicked(true);
    const config = {
      apiKey: apiKey,
      network: network,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.nft.getNftsForOwner(userAddress);
    setResults(data);
    console.log(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.ownedNfts.length; i++) {
      const tokenData = alchemy.nft.getNftMetadata(
        data.ownedNfts[i].contract.address,
        data.ownedNfts[i].tokenId
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }
  return (
    <Box w="100vw" >
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Heading>NFT Indexer 🖼</Heading>
        <Button fontSize={20} onClick={walletConnect} bgColor="blue">
          Connect Wallet
        </Button>
      </Flex>

      <Center>
        <Heading fontSize={24} my={36}>Click on "Connect Wallet" and then select a Chain</Heading>
      </Center>

      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <ButtonGroup >
          <Button fontSize={20} onClick={() => getNFTsForOwner(mainnetAPI, ethMainnet)} mt={10} bgColor="blue">
            Ethereum Mainnet
          </Button>
          <Button fontSize={20} onClick={() => getNFTsForOwner(mumbaiAPI, maticMumbai)} mt={10} bgColor="blue">
            Matic Mumbai
          </Button>
          <Button fontSize={20} onClick={() => getNFTsForOwner(sepoliaAPI, sepolia)} mt={10} bgColor="blue">
            Sepolia
          </Button>
          <Button fontSize={20} onClick={() => getNFTsForOwner(goerliAPI, goerli)} mt={10} bgColor="blue">
            Goerli
          </Button>
        </ButtonGroup>

        <Heading my={36}>Here are your NFTs:</Heading>

        {hasQueried ? (
          <Flex flexDirection={{sm: 'column', md:'row'}} justify={'center'}  flexWrap="wrap" spacing={24} rounded={'md'}>
            {results.ownedNfts.map((e, i) => {
              return (
                  <Card key={i} padding={'4px'} borderRadius={'10px'} margin={'8px'}
                        background="rgba(255, 255, 255, 0.25)"
                        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                        backdropFilter="blur(4px)"
                        webkitbackdropfilter="blur(4px)"
                        border="1px solid rgba(255, 255, 255, 0.18)"
                        _hover={{
                          shadow: 'md',
                          transform: 'translateY(-5px)',
                          transitionDuration: '0.2s',
                          transitionTimingFunction: "ease-in-out"
                        }}
                        cursor={'pointer'}
                        >
                    <Heading textColor={'black'}>
                      <b>Name:</b>{' '}
                      {tokenDataObjects[i].title?.length === 0
                        ? 'No Name'
                        : tokenDataObjects[i].title}
                    </Heading>
                    <CardBody>
                      <Image
                        p={4}
                        h={250}
                        w={250}
                        src={
                          tokenDataObjects[i]?.rawMetadata?.image ??
                          'https://via.placeholder.com/200'
                        }
                        alt={'Image'}
                      />
                    </CardBody>
                  </Card>
              );
            })}
          </Flex>
        ) : (
          clicked ? <Spinner color='red.500' size='xl' w={'20px'} h={'20px'} /> : 'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;
