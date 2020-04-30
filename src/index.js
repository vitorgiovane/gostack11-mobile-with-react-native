import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function app() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data)
      setProjects(response.data)
    })
  }, [])

  const handleButton = async () => {
    const response = await api.post('projects', {
      name: `New project ${Date.now()}`,
      owner: 'Viteras'
    })

    const project = response.data
    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (<Text style={styles.project}>{project.name}</Text>)}
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Create project</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold'
  },
  project: {
    color: '#fff',
    fontSize: 20
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  list: {
    margin: 20
  }
})
