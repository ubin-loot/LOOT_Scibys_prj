# Elastic Stack

- **Kibana** 
    ```
    - javascript
    - elasticsearch Data 시각화
    ``` 
- **Elasticsearch**
    ```
    - Apache License Lucene(Java) => Elastic License
    - data 저장소
    ``` 
- **Logstash**
    ```
    - ruby => java
    - data index 설정, 커스텀
    ``` 
- **Beats**
    ```
    - 시스템 log, event 전송
    ``` 
    * Filebeat   : App 및 사용자 설정 log
    * Winlogbeat : 윈도우 이벤트 로그(Windows)     
    * Metricbeat : OS시스템 자원 감시
    * Packetbeat : 네트워크, 패킷, 프로토콜 수집
    * Heartbeat  : 서비스의 상태 유무

---

# Setup

- **jdk 1.8 install**
    ```
    - yum list all | grep jdk
    - yum install java-1.8.0-openjdk-devel.x86_64
    - exprot JAVA_HOME=설치경로 
    ``` 
- **yum install**
    ```
    - vi /etc/yum.repos.d/elastic.repo
    
        [elastic-7.x]
        name=Elastic repository for 7.x packages
        baseurl=https://artifacts.elastic.co/packages/7.x/yum
        gpgcheck=1
        gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
        enabled=1
        autorefresh=1
        type=rpm-md 
        
    - yum -y install elasticsearch
    - yum -y install logstash
    - yum -y install kibana
    - yum -y install filebeat
        
    ``` 
- **Elastic tag.gz**
    
    - [download](https://www.elastic.co/kr/downloads/)


---

# Usage

- **start**
    ```
    - systemctl start elasticsearch.service
    - systemctl start logstash.service
    - systemctl start kibana.service 
    - systemctl start filebeat.service
    
    ```
- **stop**
    ```
    - systemctl stop elasticsearch.service
    - systemctl stop logstash.service
    - systemctl stop kibana.service 
    - systemctl stop filebeat.service
    
    ```

---

# Configure
    
- **Development**

    * Logstash 
        ```
        - vi /etc/logstash/conf.d/filebeat.conf
        ```
        ```
        input {
	  	    beats{
	  		   port => 5044
	  	    }
	    }	

	    output 
	    {
	  	    file {
	  		    path => "/var/log/logstash/%{+YYYY_MM_dd}.log"
	  		    codec => json
	  	    }
	  	
	  	    jdbc {	

	  		    connection_string => 'jdbc:postgresql://192.168.11.X:5432/mydb'
	  		    username => 'test'
	  		    password => 'test'
	  		    statement => [ "INSERT INTO logs (tm,ip,host,msg,agent) VALUES(?,CAST (? AS jsonb),CAST (? AS jsonb),?,CAST (? AS jsonb))", "@timestamp","@metadata","host","destination","agent"]
	  	    }	
	    }
        ```
        
    * Beats
        ```
        - vi [beatname].yml
        - output.logstash or output.elasticsearch 
        
          hosts["host:port"] 
        ```
        
- **Production**


    * Elasticsearch 
        ```
        - vi /etc/elasticsearch/elasticsearch.yml 주석 제거
            
            bootstrap.memory_lock: true 
            network.host: 192.168.11.66
            http.port: 9200
            cluster.initial_master_nodes: ["node-1", "node-2"]
            
        ```
        
        ```
        - vi /usr/lib/systemd/system/elasticsearch.service 추가
            
            [Service]
            LimitMEMLOCK=infinity
            
        - systemctl daemon-reload
        ```
        ```
        - vi /etc/security/limits.conf 추가
            
            elasticsearch soft memlock unlimited
            elasticsearch hard memlock unlimited
            elastic - nofile 65535 [tar.gz 경우]
            
        - systemctl daemon-reload
        ```
        ```
        - /etc/sysconfig/elasticsearch [yum 설치 경우]
            
            ES_JAVA_OPTS="-Xms4g -Xmx4g"

        ```
    * Logstash Output jdbc
        ```
        - Database jdbc download
        
            ex) postgresql-42.2.6.jar
            
        - /usr/share/logstash/vendor/jar/jdbc 
        
            postgresql-42.2.6.jar copy
            
        - /usr/share/logstash/bin
        
            ./logstash-plugin install logstash-output-jdbc
            
        - /etc/logstash/logstash.yml conf.d/*.conf
        
            config.reload.automatic: true
	        config.reload.interval: 3s
	   
        ```
        - [logstash-output-jdbc](https://github.com/theangryangel/logstash-output-jdbc) 
