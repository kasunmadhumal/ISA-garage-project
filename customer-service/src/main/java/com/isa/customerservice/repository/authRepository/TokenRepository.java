package com.isa.customerservice.repository.authRepository;

import com.isa.customerservice.model.authModel.Token;
import org.springframework.data.couchbase.repository.Collection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.isa.customerservice.config.dbConfig.CollectionNames.TOKEN_COLLECTION;


@Collection(TOKEN_COLLECTION)
@Repository
public interface TokenRepository extends CrudRepository<Token, String> {

    List<Token> findAllByExpiredIsFalseAndRevokedIsFalseAndUser_Id(String userId);

    Optional<Token> findByToken(String token);

}