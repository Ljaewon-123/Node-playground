<template>
<UCard>
  <div class="dashboard-container">
    <h2>클러스터 모니터링 대시보드</h2>
    <a :href="grafanaUrl" target="_blank" rel="noopener noreferrer">외부 링크</a>
    
    <UCard v-for="item in promQL" :key="item.promQL">
      <template #header>
        <p>{{ item.promQL }}</p>
        <p>{{ item.category }}</p>
      </template> 
      <UButton @click="callAPI(item.promQL)">{{ item.description }}</UButton>
      <pre>{{ data.get(item.promQL) }}</pre>
    </UCard>
  </div>
</UCard>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const ec2Ip = config.public.apibase
const port = config.public.port;
const grafanaUrl = `${ec2Ip}:${port}`;
const data = ref(new Map());

const callAPI = async (promQl: string) => {
  const result = await $fetch(`${ec2Ip}:30090/api/v1/query`,{
    params: {
      query: promQl
    }
  });
  data.value.set(promQl, result);
}

const { data: hello } = useFetch('/api/hello');

const promQL = [
  {
    "promQL": "up",
    "description": "모니터링 중인 모든 Target이 살아있는지 (1=alive, 0=dead)",
    "category": "클러스터 상태 관련"
  },
  {
    "promQL": "node_cpu_seconds_total",
    "description": "Node별 CPU 사용 시간",
    "category": "Node 관련"
  },
  {
    "promQL": "node_memory_MemAvailable_bytes",
    "description": "Node별 사용 가능한 메모리",
    "category": "Node 관련"
  },
  {
    "promQL": "node_memory_MemTotal_bytes",
    "description": "Node별 총 메모리 용량",
    "category": "Node 관련"
  },
  {
    "promQL": 'kube_pod_info{namespace="default"}',
    "description": "클러스터의 모든 Pod 정보",
    "category": "Pod 관련"
  },
  {
    "promQL": "kube_node_info",
    "description": "클러스터의 모든 Node 정보",
    "category": "Node 관련"
  },
  {
    "promQL": "kube_pod_container_status_restarts_total",
    "description": "Pod 컨테이너 재시작 횟수",
    "category": "Pod 관련"
  },
  {
    "promQL": 'kube_deployment_status_replicas{namespace="default"}',
    "description": "디플로이먼트별 현재 레플리카 수",
    "category": "디플로이먼트 관련"
  },
  {
    "promQL": 'kube_service_info{namespace="default"}',
    "description": "default service 정보",
    "category": "SVC 관련"
  }
]


</script>