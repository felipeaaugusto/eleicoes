package br.com.eleicoes.web.rest;

import br.com.eleicoes.EleicoesApp;

import br.com.eleicoes.domain.Eleicao;
import br.com.eleicoes.domain.Cargo;
import br.com.eleicoes.repository.EleicaoRepository;
import br.com.eleicoes.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


import static br.com.eleicoes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EleicaoResource REST controller.
 *
 * @see EleicaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EleicoesApp.class)
public class EleicaoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EleicaoRepository eleicaoRepository;

    @Mock
    private EleicaoRepository eleicaoRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEleicaoMockMvc;

    private Eleicao eleicao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EleicaoResource eleicaoResource = new EleicaoResource(eleicaoRepository);
        this.restEleicaoMockMvc = MockMvcBuilders.standaloneSetup(eleicaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Eleicao createEntity(EntityManager em) {
        Eleicao eleicao = new Eleicao()
            .nome(DEFAULT_NOME)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM);
        // Add required entity
        Cargo cargo = CargoResourceIntTest.createEntity(em);
        em.persist(cargo);
        em.flush();
        eleicao.getCargo_ids().add(cargo);
        return eleicao;
    }

    @Before
    public void initTest() {
        eleicao = createEntity(em);
    }

    @Test
    @Transactional
    public void createEleicao() throws Exception {
        int databaseSizeBeforeCreate = eleicaoRepository.findAll().size();

        // Create the Eleicao
        restEleicaoMockMvc.perform(post("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleicao)))
            .andExpect(status().isCreated());

        // Validate the Eleicao in the database
        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeCreate + 1);
        Eleicao testEleicao = eleicaoList.get(eleicaoList.size() - 1);
        assertThat(testEleicao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testEleicao.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testEleicao.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
    }

    @Test
    @Transactional
    public void createEleicaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eleicaoRepository.findAll().size();

        // Create the Eleicao with an existing ID
        eleicao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEleicaoMockMvc.perform(post("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleicao)))
            .andExpect(status().isBadRequest());

        // Validate the Eleicao in the database
        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = eleicaoRepository.findAll().size();
        // set the field null
        eleicao.setNome(null);

        // Create the Eleicao, which fails.

        restEleicaoMockMvc.perform(post("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleicao)))
            .andExpect(status().isBadRequest());

        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = eleicaoRepository.findAll().size();
        // set the field null
        eleicao.setDataInicio(null);

        // Create the Eleicao, which fails.

        restEleicaoMockMvc.perform(post("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleicao)))
            .andExpect(status().isBadRequest());

        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataFimIsRequired() throws Exception {
        int databaseSizeBeforeTest = eleicaoRepository.findAll().size();
        // set the field null
        eleicao.setDataFim(null);

        // Create the Eleicao, which fails.

        restEleicaoMockMvc.perform(post("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleicao)))
            .andExpect(status().isBadRequest());

        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEleicaos() throws Exception {
        // Initialize the database
        eleicaoRepository.saveAndFlush(eleicao);

        // Get all the eleicaoList
        restEleicaoMockMvc.perform(get("/api/eleicaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eleicao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEleicaosWithEagerRelationshipsIsEnabled() throws Exception {
        EleicaoResource eleicaoResource = new EleicaoResource(eleicaoRepositoryMock);
        when(eleicaoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEleicaoMockMvc = MockMvcBuilders.standaloneSetup(eleicaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEleicaoMockMvc.perform(get("/api/eleicaos?eagerload=true"))
        .andExpect(status().isOk());

        verify(eleicaoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEleicaosWithEagerRelationshipsIsNotEnabled() throws Exception {
        EleicaoResource eleicaoResource = new EleicaoResource(eleicaoRepositoryMock);
            when(eleicaoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEleicaoMockMvc = MockMvcBuilders.standaloneSetup(eleicaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEleicaoMockMvc.perform(get("/api/eleicaos?eagerload=true"))
        .andExpect(status().isOk());

            verify(eleicaoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEleicao() throws Exception {
        // Initialize the database
        eleicaoRepository.saveAndFlush(eleicao);

        // Get the eleicao
        restEleicaoMockMvc.perform(get("/api/eleicaos/{id}", eleicao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eleicao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEleicao() throws Exception {
        // Get the eleicao
        restEleicaoMockMvc.perform(get("/api/eleicaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEleicao() throws Exception {
        // Initialize the database
        eleicaoRepository.saveAndFlush(eleicao);

        int databaseSizeBeforeUpdate = eleicaoRepository.findAll().size();

        // Update the eleicao
        Eleicao updatedEleicao = eleicaoRepository.findById(eleicao.getId()).get();
        // Disconnect from session so that the updates on updatedEleicao are not directly saved in db
        em.detach(updatedEleicao);
        updatedEleicao
            .nome(UPDATED_NOME)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM);

        restEleicaoMockMvc.perform(put("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEleicao)))
            .andExpect(status().isOk());

        // Validate the Eleicao in the database
        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeUpdate);
        Eleicao testEleicao = eleicaoList.get(eleicaoList.size() - 1);
        assertThat(testEleicao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testEleicao.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testEleicao.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    public void updateNonExistingEleicao() throws Exception {
        int databaseSizeBeforeUpdate = eleicaoRepository.findAll().size();

        // Create the Eleicao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEleicaoMockMvc.perform(put("/api/eleicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleicao)))
            .andExpect(status().isBadRequest());

        // Validate the Eleicao in the database
        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEleicao() throws Exception {
        // Initialize the database
        eleicaoRepository.saveAndFlush(eleicao);

        int databaseSizeBeforeDelete = eleicaoRepository.findAll().size();

        // Get the eleicao
        restEleicaoMockMvc.perform(delete("/api/eleicaos/{id}", eleicao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Eleicao> eleicaoList = eleicaoRepository.findAll();
        assertThat(eleicaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Eleicao.class);
        Eleicao eleicao1 = new Eleicao();
        eleicao1.setId(1L);
        Eleicao eleicao2 = new Eleicao();
        eleicao2.setId(eleicao1.getId());
        assertThat(eleicao1).isEqualTo(eleicao2);
        eleicao2.setId(2L);
        assertThat(eleicao1).isNotEqualTo(eleicao2);
        eleicao1.setId(null);
        assertThat(eleicao1).isNotEqualTo(eleicao2);
    }
}
