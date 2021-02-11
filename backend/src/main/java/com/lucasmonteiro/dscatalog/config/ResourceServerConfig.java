package com.lucasmonteiro.dscatalog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
	
	@Autowired
	private JwtTokenStore tokenStore;
	
	private static final String[] PUBLIC = { "/oauth/token" };
	
	private static final String[] OPERATOR_OR_ADMIN = { "/products/**", "/categories/**" }; // Rotas que serão liberadas para quem tiver perfil de operador e de admin
	
	private static final String[] ADMIN = { "/users/**" };

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.tokenStore(tokenStore); // Com isso o Resource server vai ser capaz de decodificar o token e analizar se este token está batendo com o secret e se está expirado ou não...
	}

	@Override
	public void configure(HttpSecurity http) throws Exception { // Neste método será configurado quem pode acessar o que
		
		http.authorizeRequests()
		.antMatchers(PUBLIC).permitAll()
		.antMatchers(HttpMethod.GET, OPERATOR_OR_ADMIN).permitAll() // Libera somente o método GET no vetor OPERATOR_OR_ADMIN
		.antMatchers(OPERATOR_OR_ADMIN).hasAnyRole("OPERATOR", "ADMIN") // Significa que as rotas do vetor OPERATOR_OR_ADMIN podem ser acessadas por quem tiver algum dos roles "OPERATOR" ou "ADMIN"
		.antMatchers(ADMIN).hasRole("ADMIN") // Significa que só quem tiver o role ADMIN pode acessar as rotas do vetor ADMIN
		.anyRequest().authenticated(); // Qualquer outra rota que não tenha sido especificada pode ser acessada por quem estiver logado (não importando o usuário)
		
	}
	
	

}
