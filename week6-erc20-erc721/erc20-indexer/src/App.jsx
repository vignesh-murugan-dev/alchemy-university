import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  Icon
} from '@chakra-ui/react';
import { FaGithub } from "react-icons/fa";
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [clicked, setClicked] = useState(false);

  async function getTokenBalance() {
    setClicked(true);
    const config = {
      apiKey: '<-- YOUR API KEY -->',
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }
  return (
    <Box w="100vw" textColor={'black'}>
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <Button fontSize={20} onClick={getTokenBalance} mt={24} bgColor="blue">
          Check ERC-20 Token Balances
        </Button>

        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <Flex flexDirection={{sm: 'column', md:'row'}} justify={'center'}  flexWrap="wrap" spacing={24} rounded={'md'}>
                  {results.tokenBalances.map((e, i) => {
                    return (
                        <Card width={'300px'}  padding={'20px'} borderRadius={'10px'} margin={'8px'}
                        background="rgba(255, 255, 255, 0.25)"
                        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                        backdropFilter="blur(4px)"
                        WebkitBackdropFilter="blur(4px)"
                        border="1px solid rgba(255, 255, 255, 0.18)"
                        _hover={{
                          shadow: 'md',
                          transform: 'translateY(-5px)',
                          transitionDuration: '0.2s',
                          transitionTimingFunction: "ease-in-out"
                        }}
                        cursor={'pointer'}
                        >
                          <CardBody>
                            <Text><b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;</Text>
                            <Text><b>Balance:</b>&nbsp; {Math.round(Utils.formatUnits(e.tokenBalance,tokenDataObjects[i].decimals))}</Text>
                          </CardBody>
                        </Card>
                    );
                  })}
                </Flex>
              )
         : (
          clicked ? <Spinner color='red.500' size='xl' w={'20px'} h={'20px'} /> : 'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;
