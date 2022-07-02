import React, { useEffect, useState } from "react";
import { Box, Text, Button, Image, Flex, View } from "native-base";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getGarageDetails } from "../../services/auth.service";
import { SwipeablePanel } from "rn-swipeable-panel";

const InfoBox = ({ image, data, dataName }) => (
  <View
    width={100}
    m={4}
    mx={8}
    rounded="sm"
    _text={{
      color: "warmGray.50",
      fontWeight: "medium",
    }}
  >
    <Flex flexDirection={"row"} alignItems={"center"}>
      <View>
        <Image
          alt={dataName}
          source={image}
          style={{ width: 40, height: 40, marginRight: 10 }}
          resizeMode={"contain"}
        />
      </View>
      <Flex>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#FFE040",
          }}
        >
          {data}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
            color: "#FFF",
          }}
        >
          {dataName}
        </Text>
      </Flex>
    </Flex>
  </View>
);

export function Garage() {
  const [garageData, setGarageData] = useState(null);
  const [isPanelActive, setIsPanelActive] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("annually");

  const panelProps = {
    fullWidth: true,
    openSmall: true,
    showCloseButton: true,
    smallPanelHeight: 600,
    onClose: () => setIsPanelActive(false),
    onPressCloseButton: () => setIsPanelActive(false),
    style: {
      backgroundColor: "#323232",
    },
    closeOnTouchOutside: true,
  };
  useEffect(() => {
    (async () => {
      let data = await getGarageDetails();
      setGarageData(data.garageDetails);
    })();
  }, []);

  if (garageData) {
    return (
      <Box
        safeArea
        w="100%"
        h="100%"
        backgroundColor={"#2B2B2B"}
        alignItems="center"
      >
        <Image
          source={{
            uri: "https://www.pngmart.com/files/22/Tesla-PNG-Transparent.png",
          }}
          alt="mycar"
          style={{ width: 400, height: 160, marginTop: 64 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            fontWeight: "bold",
            marginTop: 30,
          }}
        >
          {garageData.brand} {garageData.model}
        </Text>
        <Flex
          mt={12}
          alignItems="center"
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <InfoBox
            image={require("../../assets/garage/battery.png")}
            data={garageData.charge * 100 + "%"}
            dataName={"CHARGE"}
          />
          <InfoBox
            image={require("../../assets/garage/health.png")}
            data={garageData.health}
            dataName={"HEALTH"}
          />
        </Flex>
        <Flex
          mt={2}
          alignItems="center"
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <InfoBox
            image={require("../../assets/garage/time.png")}
            data={garageData.etc + " Hours"}
            dataName={"TIME EST"}
          />
          <InfoBox
            image={require("../../assets/garage/voltage.png")}
            data={garageData.voltage}
            dataName={"VOLTAGE"}
          />
        </Flex>

        <Button
          mt={"auto"}
          rounded="sm"
          bgColor={"#FFE040"}
          _text={{
            color: "#2B2B2B",
            fontWeight: "bold",
            fontSize: 14,
          }}
          onPress={() => setIsPanelActive(true)}
          w="90%"
        >
          VIEW PLANS
        </Button>
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
          <Flex
            my={8}
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"row"}
            mx={16}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                EV Charging Plans
              </Text>
            </View>
          </Flex>
          <TouchableOpacity
            onPress={() => setSelectedPlan("annually")}
            activeOpacity={1}
          >
            <View
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              my={2}
              py={2}
              mx={4}
              borderColor={selectedPlan == "annually" ? "#ffe040" : "#2B2B2B"}
              borderWidth={2}
              borderRadius={"sm"}
              style={{
                backgroundColor: "#1d1d1d",
              }}
            >
              <Box p="2">
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffe040",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  YEARLY PLAN
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    marginLeft: 10,
                  }}
                >
                  150 HOURS OF CHARGING PER MONTH
                </Text>
              </Box>
              <Box p="2">
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffe040",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  $300/mo
                </Text>
              </Box>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPlan("monthly")}
            activeOpacity={1}
          >
            <View
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              my={2}
              py={2}
              mx={4}
              borderRadius={"sm"}
              borderColor={selectedPlan === "monthly" ? "#ffe040" : "#2B2B2B"}
              borderWidth={2}
              style={{
                backgroundColor: "#1d1d1d",
              }}
            >
              <Box p="2">
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffe040",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  MONTHLY PLAN
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    marginLeft: 10,
                  }}
                >
                  100 HOURS OF CHARGING PER MONTH
                </Text>
              </Box>
              <Box p="2">
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffe040",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  $350/mo
                </Text>
              </Box>
            </View>
          </TouchableOpacity>
          <Button
            my={4}
            rounded="sm"
            bgColor={"#FFE040"}
            _text={{
              color: "#2B2B2B",
              fontWeight: "bold",
              fontSize: 14,
            }}
            w="90%"
            mx="auto"
          >
            PURCHASE PLAN
          </Button>
        </SwipeablePanel>
        <Button
          my={4}
          rounded="sm"
          bgColor={"#FFE040"}
          _text={{
            color: "#2B2B2B",
            fontWeight: "bold",
            fontSize: 14,
          }}
          w="90%"
        >
          ENTER VENDOR DETAILS
        </Button>
      </Box>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFE040" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
});

export default Garage;
