import { create } from "zustand"
import { StatementList } from "../../lib/Statement/StatementList"
import { RawStatementData } from "../../lib/interfaces/Statement"
import { serializeStatement } from "../../lib/serializers/statementSerializer"

interface StatementsState {
  statements: StatementList
  latestStatements: StatementList
  setStatements: (users: Array<RawStatementData>) => void
  setLatestStatements: (users: Array<RawStatementData>) => void
}

const useStatementStore = create<StatementsState>(set => ({
  statements: null,
  latestStatements: null,
  setStatements: statements => {
    const statementList = new StatementList(
      statements.map(statement => serializeStatement(statement))
    )
    set({ statements: statementList })
  },
  setLatestStatements: statements => {
    const statementList = new StatementList(
      statements.map(statement => serializeStatement(statement))
    )
    set({ latestStatements: statementList })
  },
}))

export default useStatementStore
