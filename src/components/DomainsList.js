import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {ArrowRight} from "../assets/icons";
import Collapsible from "react-native-collapsible";
import {SIZES} from "../constants";
import TargetSkillsList from "./TargetSkillsList";
import {useSelector} from "react-redux";

export default function DomainsList({
                                      domains,
                                      themes,
                                      client_id,
                                      client_name,
                                      skillsCollapsed,
                                      navigation,
                                    }) {
  const isUserNew = useSelector((state) => state.auth.isUserNew);

  return (
    <View style={{marginTop: 15}}>
      {domains.map((domain, index) => {
          return (domain.skills_list.length > 0 &&
            <View key={domain.domain_id + domain.title}>
              <Subdomain
                themes={themes}
                subdomain={domain}
                client_id={client_id}
                client_name={client_name}
                skills={domain.skills_list}
                skillsCollapsed={skillsCollapsed}
                navigation={navigation}
                index={index}
                isUserNew={isUserNew}
              />
            </View>
          )
        }
      )}

      {/* <Subdomain
        client_id={client_id}
        client_name={client_name}
        themes={themes}
        subdomain={{ title: "Maladaptive behavior" }}
        skills={domains[0] ? domains[0].skills_list : []}
        skillsCollapsed={skillsCollapsed}
        navigation={navigation}
      /> */}
    </View>
  );
}

function Subdomain({
                     themes,
                     subdomain,
                     client_id,
                     client_name,
                     skills,
                     skillsCollapsed,
                     navigation,
                     index,
                     isUserNew,
                   }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsCollapsed(skillsCollapsed);
  }, [skillsCollapsed]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsCollapsed((prevState) => !prevState)}
        activeOpacity={1}
        style={[
          styles.domain,
          {backgroundColor: themes.subdomainBackgroundColor},
        ]}
      >
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={[{color: themes.textColor}, styles.domainText]}>
            {subdomain.title}
          </Text>
        </View>

        <View
          style={[
            {
              transform: [{rotate: !isCollapsed ? "-90deg" : "0deg"}],
            },
          ]}
        >
          <ArrowRight color={themes.textColor}/>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed} style={{overflow: "visible"}}>
        <View style={{marginTop: 10}}>
          <TargetSkillsList
            targetSkills={skills}
            themes={themes}
            client_id={client_id}
            client_name={client_name}
            navigation={navigation}
            subDomainOpened={!isCollapsed}
          />
        </View>
      </Collapsible>
    </>
  );
}

const styles = StyleSheet.create({
  domain: {
    width: "100%",
    minHeight: 64,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    paddingLeft: 23,
    paddingRight: 30,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 20,
    },
    shadowOpacity: 0.018,
    shadowRadius: 50,
  },
  domainText: {
    maxWidth: SIZES.width * 0.55,
  },
});
